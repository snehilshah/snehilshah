// Figures as Geet shows them: compact, tabular, never wrapping.

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const whole = new Intl.NumberFormat('en-IN')

export const count = (n) => (n >= 10000 ? compact.format(n) : whole.format(n ?? 0))

/** "1 play", "12 plays" */
export const plays = (n) => `${count(n)} ${n === 1 ? 'play' : 'plays'}`

/** 8d 6h · 3h 20m · 12m */
export function listening(ms) {
  const m = Math.round((ms ?? 0) / 60000)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return m % 60 ? `${h}h ${m % 60}m` : `${h}h`
  const d = Math.floor(h / 24)
  return h % 24 ? `${d}d ${h % 24}h` : `${d}d`
}

/** Whole hours, for big headline figures. */
export const hours = (ms) => whole.format(Math.round((ms ?? 0) / 3600000))

export const duration = (ms) => {
  const s = Math.round((ms ?? 0) / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const TZ = 'Asia/Kolkata'
const dayFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: TZ })
const dayYearFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TZ })
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ })
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })
const monthYearFmt = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

export const date = (ms) => {
  const d = new Date(ms)
  return d.getUTCFullYear() === new Date().getUTCFullYear() ? dayFmt.format(d) : dayYearFmt.format(d)
}
export const fullDate = (ms) => dayYearFmt.format(new Date(ms))
export const time = (ms) => timeFmt.format(new Date(ms))
/** "2026-10-01" → "Oct" */
export const month = (iso) => monthFmt.format(new Date(iso + 'T00:00:00Z'))
export const monthYear = (iso) => monthYearFmt.format(new Date(iso + 'T00:00:00Z'))
/** "2026-10-03" → "3 Oct 2026" */
export const isoDay = (iso) => dayYearFmt.format(new Date(iso + 'T12:00:00+05:30'))

/** Relative: "just now", "12m ago", "3h ago", then the date. */
export function ago(ms, now = Date.now()) {
  const m = Math.floor((now - ms) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return date(ms)
}

export const percent = (x) => `${Math.round((x ?? 0) * 100)}%`

/** Change against the previous period: "+12%", "−5%", or null when there's nothing to compare. */
export function delta(now, before) {
  if (!before) return null
  const d = (now - before) / before
  if (Math.abs(d) < 0.005) return '0%'
  return `${d > 0 ? '+' : '−'}${Math.round(Math.abs(d) * 100)}%`
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const weekday = (i) => WEEKDAYS[i]
export const hourLabel = (h) => (h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`)
