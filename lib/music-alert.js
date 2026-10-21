import 'server-only'
import { reverse } from 'node:dns/promises'

// Emails the owner about every birthday attempt on the music gate, with what
// the request, an IP lookup and the visitor's browser reveal. Best effort:
// any failure is logged and never affects the visitor.

const EMAIL_CAP = 40 // per server instance per hour, so a flood can't drain the Resend quota
let sent = []

const header = (headers, name) => headers.get(name)?.trim() || undefined
const decode = value => {
  try {
    return value && decodeURIComponent(value)
  } catch {
    return value
  }
}

/** Everything the request itself says about the visitor. Call during the request. */
export function requestDetails(request) {
  const h = request.headers
  const ip =
    header(h, 'x-real-ip') ||
    header(h, 'x-vercel-forwarded-for')?.split(',')[0].trim() ||
    header(h, 'x-forwarded-for')?.split(',')[0].trim() ||
    header(h, 'cf-connecting-ip')
  const lat = header(h, 'x-vercel-ip-latitude')
  const lon = header(h, 'x-vercel-ip-longitude')
  return {
    at: Date.now(),
    ip,
    host: header(h, 'host'),
    userAgent: header(h, 'user-agent'),
    language: header(h, 'accept-language'),
    referer: header(h, 'referer'),
    // Location from the hosting edge (Vercel or Cloudflare), when present.
    edge: {
      city: decode(header(h, 'x-vercel-ip-city')),
      region: header(h, 'x-vercel-ip-country-region'),
      country: header(h, 'x-vercel-ip-country') || header(h, 'cf-ipcountry'),
      postal: header(h, 'x-vercel-ip-postal-code'),
      timezone: header(h, 'x-vercel-ip-timezone'),
      coords: lat && lon ? `${lat},${lon}` : undefined
    },
    hints: {
      brands: header(h, 'sec-ch-ua'),
      mobile: header(h, 'sec-ch-ua-mobile'),
      platform: header(h, 'sec-ch-ua-platform')?.replaceAll('"', '')
    },
    privacy: [
      header(h, 'dnt') === '1' && 'Do Not Track',
      header(h, 'sec-gpc') === '1' && 'Global Privacy Control'
    ]
      .filter(Boolean)
      .join(', '),
    via: header(h, 'via')
  }
}

const text = (value, max = 300) =>
  value === undefined || value === null || value === ''
    ? undefined
    : String(value).slice(0, max)

/** The browser's own report, from the form. Untrusted: keep known keys, as short strings. */
export function clientDetails(raw) {
  let data
  try {
    data = typeof raw === 'string' && raw.length < 12000 ? JSON.parse(raw) : null
  } catch {
    /* Ignore malformed reports. */
  }
  if (!data || typeof data !== 'object') return null
  const out = {}
  for (const key of [
    'timezone',
    'offset',
    'localTime',
    'languages',
    'screen',
    'available',
    'viewport',
    'dpr',
    'colorDepth',
    'orientation',
    'platform',
    'cores',
    'memory',
    'touch',
    'scheme',
    'standalone',
    'connection',
    'gpu',
    'referrer',
    'webdriver',
    'brave',
    'onPage',
    'visitor',
    'firstSeen',
    'visits',
    'tries'
  ])
    out[key] = text(data[key])
  const hints = data.hints && typeof data.hints === 'object' ? data.hints : {}
  out.hints = {}
  for (const key of [
    'platform',
    'platformVersion',
    'model',
    'architecture',
    'bitness',
    'mobile',
    'brands',
    'formFactors'
  ])
    out.hints[key] = text(hints[key])
  out.guesses = Array.isArray(data.guesses)
    ? data.guesses
        .filter(value => /^\d{4}-\d{2}-\d{2}$/.test(value))
        .slice(-20)
    : []
  return out
}

const BROWSERS = [
  [/Instagram ([\d.]+)/, 'Instagram in-app'],
  [/FBAV\/([\d.]+)|FB_IAB|FBAN/, 'Facebook in-app'],
  [/Snapchat\/([\d.]+)/, 'Snapchat in-app'],
  [/LinkedInApp\/?([\d.]*)/, 'LinkedIn in-app'],
  [/WhatsApp\/([\d.]+)/, 'WhatsApp in-app'],
  [/Line\/([\d.]+)/, 'LINE in-app'],
  [/ GSA\/([\d.]+)/, 'Google app'],
  [/EdgA?\/([\d.]+)|EdgiOS\/([\d.]+)/, 'Edge'],
  [/OPR\/([\d.]+)|OPiOS\/([\d.]+)|OPT\/([\d.]+)/, 'Opera'],
  [/SamsungBrowser\/([\d.]+)/, 'Samsung Internet'],
  [/YaBrowser\/([\d.]+)/, 'Yandex'],
  [/Vivaldi\/([\d.]+)/, 'Vivaldi'],
  [/DuckDuckGo\/([\d.]+)/, 'DuckDuckGo'],
  [/FxiOS\/([\d.]+)|Firefox\/([\d.]+)/, 'Firefox'],
  [/CriOS\/([\d.]+)|Chrome\/([\d.]+)/, 'Chrome'],
  [/Version\/([\d.]+).*Safari/, 'Safari']
]
const WINDOWS = {
  '10.0': 'Windows 10/11',
  6.3: 'Windows 8.1',
  6.2: 'Windows 8',
  6.1: 'Windows 7'
}
const BOT =
  /bot\b|crawl|spider|slurp|curl\/|wget|python|httpclient|axios|node-fetch|go-http|headless|lighthouse|preview|scrapy/i

/** Browser, OS and device from a user agent string. */
export function parseUserAgent(ua = '') {
  let os
  let device
  let match
  if ((match = ua.match(/iPhone OS (\d+)_(\d+)/)) || /iPhone/.test(ua)) {
    os = match ? `iOS ${match[1]}.${match[2]}` : 'iOS'
    device = 'iPhone'
  } else if ((match = ua.match(/iPad.*? OS (\d+)_(\d+)/)) || /iPad/.test(ua)) {
    os = match ? `iPadOS ${match[1]}.${match[2]}` : 'iPadOS'
    device = 'iPad'
  } else if ((match = ua.match(/Android (\d+(?:\.\d+)?)(?:; ([^;)]+))?/))) {
    os = `Android ${match[1]}`
    const model = match[2]?.replace(/ Build\/.*/, '').trim()
    device =
      model && !/^(K|wv|Linux|U|Mobile)$/.test(model)
        ? model
        : /Mobile/.test(ua)
          ? 'Android phone'
          : 'Android tablet'
  } else if ((match = ua.match(/Windows NT (\d+\.\d+)/))) {
    os = WINDOWS[match[1]] || `Windows NT ${match[1]}`
    device = 'PC'
  } else if (/Mac OS X/.test(ua)) {
    os = 'macOS'
    device = 'Mac'
  } else if (/CrOS/.test(ua)) {
    os = 'ChromeOS'
    device = 'Chromebook'
  } else if (/Linux/.test(ua)) {
    os = 'Linux'
    device = 'PC'
  }
  let browser
  for (const [pattern, name] of BROWSERS) {
    const found = ua.match(pattern)
    if (!found) continue
    const version = found.slice(1).find(Boolean)?.split('.')[0]
    browser = version ? `${name} ${version}` : name
    break
  }
  if (/; wv\)/.test(ua) && browser?.startsWith('Chrome'))
    browser = 'Android WebView'
  return { os, device, browser, bot: BOT.test(ua) }
}

// iPhones don't name their model; the screen size and density narrow it down.
const IPHONES = {
  '320x568@2': 'iPhone SE (1st gen) / 5s',
  '375x667@2': 'iPhone SE (2nd/3rd gen) / 6–8',
  '414x736@3': 'iPhone 6–8 Plus',
  '375x812@3': 'iPhone X / XS / 11 Pro / 12–13 mini',
  '414x896@2': 'iPhone XR / 11',
  '414x896@3': 'iPhone XS Max / 11 Pro Max',
  '390x844@3': 'iPhone 12–14 / 16e',
  '428x926@3': 'iPhone 12–13 Pro Max / 14 Plus',
  '393x852@3': 'iPhone 14 Pro / 15 / 15 Pro / 16',
  '430x932@3': 'iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus',
  '402x874@3': 'iPhone 16 Pro / 17 / 17 Pro',
  '420x912@3': 'iPhone Air',
  '440x956@3': 'iPhone 16 Pro Max / 17 Pro Max'
}

export function likelyIphone(screen, dpr) {
  const [a, b] = String(screen || '')
    .split('×')
    .map(Number)
  if (!a || !b) return undefined
  return IPHONES[`${Math.min(a, b)}x${Math.max(a, b)}@${Math.round(dpr)}`]
}

function describeDevice(ua, client) {
  const parsed = parseUserAgent(ua)
  const hints = client?.hints || {}
  let { os, device, browser } = parsed
  if (hints.model) device = hints.model
  if (hints.platform === 'Windows' && hints.platformVersion)
    os =
      Number(hints.platformVersion.split('.')[0]) >= 13
        ? 'Windows 11'
        : 'Windows 10'
  else if (hints.platform === 'macOS' && hints.platformVersion)
    os = `macOS ${hints.platformVersion.replace(/\.0$/, '')}`
  else if (hints.platform === 'Android' && hints.platformVersion)
    os = `Android ${hints.platformVersion.replace(/\.0(\.0)?$/, '')}`
  // iPads ask for desktop sites and report themselves as a Mac.
  if (device === 'Mac' && Number(client?.touch) > 1) {
    device = 'iPad'
    os = 'iPadOS'
  }
  const model =
    device === 'iPhone' ? likelyIphone(client?.screen, client?.dpr) : undefined
  if (client?.brave === 'true' && browser?.startsWith('Chrome'))
    browser = browser.replace('Chrome', 'Brave')
  return { ...parsed, os, device, browser, model }
}

const PRIVATE_IP =
  /^(?:127\.|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|169\.254\.|::1$|f[cd]|fe80:|::ffff:127\.)/i

const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise(resolve => setTimeout(resolve, ms, undefined))
  ]).catch(() => undefined)

async function getJson(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(2500),
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  })
  return response.ok ? response.json() : undefined
}

/** Network and location for an IP from free lookups (ipwho.is, then ipinfo.io). */
export async function lookupIp(ip) {
  if (!ip || PRIVATE_IP.test(ip)) return {}
  const [who, hostnames] = await Promise.all([
    withTimeout(getJson(`https://ipwho.is/${encodeURIComponent(ip)}`), 3000),
    withTimeout(reverse(ip), 1500)
  ])
  const hostname = hostnames?.[0]
  if (who?.success) {
    return {
      city: who.city,
      region: who.region,
      postal: who.postal,
      country: who.country,
      flag: who.flag?.emoji,
      coords:
        who.latitude && who.longitude
          ? `${who.latitude},${who.longitude}`
          : undefined,
      timezone: who.timezone?.id,
      isp: who.connection?.isp,
      org:
        who.connection?.org !== who.connection?.isp
          ? who.connection?.org
          : undefined,
      asn: who.connection?.asn ? `AS${who.connection.asn}` : undefined,
      domain: who.connection?.domain,
      hostname
    }
  }
  const info = await withTimeout(
    getJson(`https://ipinfo.io/${encodeURIComponent(ip)}/json`),
    3000
  )
  if (!info || info.bogon) return { hostname }
  const [asn, ...org] = (info.org || '').split(' ')
  return {
    city: info.city,
    region: info.region,
    postal: info.postal,
    country: info.country,
    coords: info.loc,
    timezone: info.timezone,
    isp: org.join(' ') || undefined,
    asn: asn || undefined,
    hostname: info.hostname || hostname
  }
}

const DATACENTER =
  /amazon|aws|google cloud|microsoft|azure|digitalocean|linode|akamai|ovh|hetzner|vultr|oracle|cloudflare|m247|datacamp|leaseweb|choopa|contabo|scaleway|tencent|alibaba|nord|express ?vpn|proton|mullvad|surfshark|private internet/i

const date = value =>
  /^\d{4}-\d{2}-\d{2}$/.test(value || '')
    ? new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
      })
    : undefined

const duration = ms => {
  const seconds = Math.round(Number(ms) / 1000)
  if (!Number.isFinite(seconds)) return undefined
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return minutes < 60
    ? `${minutes}m ${seconds % 60}s`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

/** Subject and sections for one attempt. Exported for tests. */
export function composeAlert({ outcome, guess, next, details, client, ip = {} }) {
  const device = describeDevice(details.userAgent, client)
  const place = [
    ip.city || details.edge.city,
    ip.region || details.edge.region,
    ip.country || details.edge.country
  ].filter(Boolean)
  const where = place.length ? place.join(', ') : 'Unknown place'
  const deviceName = device.model || device.device || 'Unknown device'
  const what = [deviceName, device.browser].filter(Boolean).join(' · ')
  const zone = process.env.MUSIC_ALERT_TIMEZONE || 'Asia/Kolkata'
  const when = new Date(details.at).toLocaleString('en-GB', {
    timeZone: zone,
    dateStyle: 'medium',
    timeStyle: 'medium'
  })
  const ipZone = ip.timezone || details.edge.timezone
  const vpnHints = [
    client?.timezone &&
      ipZone &&
      client.timezone !== ipZone &&
      `device clock is ${client.timezone}, IP is ${ipZone}`,
    DATACENTER.test(`${ip.isp} ${ip.org}`) && 'IP belongs to a hosting/VPN provider'
  ].filter(Boolean)
  const coords = ip.coords || details.edge.coords
  const earlier = client?.guesses?.map(date).join(', ')

  const title = {
    unlocked: 'Music unlocked',
    incorrect: `Wrong guess: ${date(guess) || 'no date'}`,
    limited: 'Hit the guess limit (blocked for 15 min)'
  }[outcome]
  const icon = { unlocked: '🔓', incorrect: '✗', limited: '⏳' }[outcome]
  const subject = `${icon} ${title} · ${place[0] || where} · ${what}`

  const sections = [
    [
      'Attempt',
      [
        ['Result', title],
        ['Guessed', outcome === 'unlocked' ? 'The right date' : date(guess)],
        ['Earlier guesses this visit', earlier],
        ['Tries this visit', client?.tries],
        ['Time on page', duration(client?.onPage)],
        ['When', `${when} (${zone})`],
        ['Their local time', client?.localTime],
        ['Heading to', next],
        ['Came from', client?.referrer || details.referer]
      ]
    ],
    [
      'Location (from IP)',
      [
        ['Place', `${ip.flag ? `${ip.flag} ` : ''}${where}`],
        ['Postal code', ip.postal || details.edge.postal],
        [
          'Coordinates',
          coords && {
            text: coords,
            href: `https://www.google.com/maps?q=${encodeURIComponent(coords)}`
          }
        ],
        ['IP timezone', ipZone],
        [
          'Edge location',
          [details.edge.city, details.edge.region, details.edge.country]
            .filter(Boolean)
            .join(', ') || undefined
        ]
      ]
    ],
    [
      'Network',
      [
        ['IP address', details.ip],
        ['ISP', ip.isp],
        ['Organisation', ip.org],
        ['ASN', ip.asn],
        ['Network domain', ip.domain],
        ['Reverse DNS', ip.hostname],
        ['VPN / proxy signs', vpnHints.join('; ') || (client ? 'None seen' : undefined)],
        ['Connection', client?.connection],
        ['Via', details.via]
      ]
    ],
    [
      'Device',
      [
        ['Device', device.model ? `${device.model} (likely)` : device.device],
        ['OS', device.os],
        ['Browser', device.browser],
        ['Screen', client?.screen && `${client.screen} @${client.dpr}x, ${client.colorDepth}-bit`],
        ['Window', client?.viewport],
        ['Orientation', client?.orientation],
        ['Touch points', client?.touch],
        ['CPU cores', client?.cores],
        ['Memory', client?.memory && `${client.memory} GB+`],
        ['GPU', client?.gpu],
        ['Architecture', [client?.hints.architecture, client?.hints.bitness && `${client.hints.bitness}-bit`].filter(Boolean).join(' ') || undefined],
        ['Platform', client?.platform],
        ['Installed app', client?.standalone === 'true' ? 'Yes' : undefined],
        ['Theme', client?.scheme],
        ['Languages', client?.languages || details.language],
        ['Device timezone', client?.timezone],
        ['Privacy signals', details.privacy || undefined],
        [
          'Automation',
          device.bot || client?.webdriver === 'true'
            ? 'Looks automated (bot or webdriver)'
            : client
              ? undefined
              : 'No browser report (JavaScript off or a script)'
        ]
      ]
    ],
    [
      'This browser',
      [
        ['Browser ID', client?.visitor],
        [
          'First seen',
          client?.firstSeen &&
            (Number.isNaN(Date.parse(client.firstSeen))
              ? client.firstSeen
              : new Date(client.firstSeen).toLocaleString('en-GB', {
                  timeZone: zone,
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }))
        ],
        ['Visits to the gate', client?.visits]
      ]
    ],
    [
      'Raw',
      [
        ['User agent', details.userAgent],
        ['Client hints', client?.hints.brands || details.hints.brands],
        [
          'Hint platform',
          [
            client?.hints.platform || details.hints.platform,
            client?.hints.platformVersion,
            client?.hints.formFactors
          ]
            .filter(Boolean)
            .join(' · ') || undefined
        ],
        ['Accept-Language', details.language],
        ['Host', details.host]
      ]
    ]
  ]
    .map(([name, rows]) => [name, rows.filter(([, value]) => value)])
    .filter(([, rows]) => rows.length)

  return { subject, title, icon, sections }
}

const escape = value =>
  String(value).replace(
    /[&<>"']/g,
    char =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ]
  )

export function renderAlert({ subject, title, icon, sections }) {
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f1f8;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#1d1b20">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:16px;padding:24px">
<h1 style="margin:0 0 4px;font-size:20px">${escape(icon)} ${escape(title)}</h1>
<p style="margin:0 0 16px;color:#625b71;font-size:14px">${escape(subject.split(' · ').slice(1).join(' · '))}</p>
${sections
  .map(
    ([name, rows]) => `<h2 style="margin:20px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:#6750a4">${escape(name)}</h2>
<table style="width:100%;border-collapse:collapse;font-size:14px">${rows
      .map(
        ([label, value]) => `<tr><td style="padding:5px 12px 5px 0;color:#625b71;vertical-align:top;width:38%">${escape(label)}</td><td style="padding:5px 0;word-break:break-word">${
          typeof value === 'object'
            ? `<a href="${escape(value.href)}" style="color:#6750a4">${escape(value.text)}</a>`
            : escape(value)
        }</td></tr>`
      )
      .join('')}</table>`
  )
  .join('\n')}
</div></body></html>`
  const plain = [
    `${icon} ${title}`,
    ...sections.map(
      ([name, rows]) =>
        `\n${name.toUpperCase()}\n${rows
          .map(
            ([label, value]) =>
              `${label}: ${typeof value === 'object' ? `${value.text} (${value.href})` : value}`
          )
          .join('\n')}`
    )
  ].join('\n')
  return { html, text: plain }
}

/** Look up the IP and email the owner. Never throws. */
export async function sendAttemptAlert({ outcome, guess, next, details, client }) {
  try {
    const key = process.env.RESEND_API_KEY
    const to = process.env.MUSIC_ALERT_TO
    if (!key || !to) return
    const now = Date.now()
    sent = sent.filter(time => time > now - 60 * 60 * 1000)
    if (sent.length >= EMAIL_CAP) return
    sent.push(now)
    const ip = await lookupIp(details.ip)
    const alert = composeAlert({
      outcome,
      guess,
      next,
      details,
      client: clientDetails(client),
      ip
    })
    const { html, text } = renderAlert(alert)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.MUSIC_ALERT_FROM || 'Music gate <music@snehilshah.com>',
        to: to.split(',').map(address => address.trim()),
        subject: alert.subject,
        html,
        text
      }),
      signal: AbortSignal.timeout(8000)
    })
    if (!response.ok)
      console.error(
        'Music alert email failed',
        response.status,
        await response.text().catch(() => '')
      )
  } catch (error) {
    console.error('Music alert email failed', error)
  }
}
