import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  clientDetails,
  composeAlert,
  likelyIphone,
  parseUserAgent,
  renderAlert
} from '../lib/music-alert.js'

const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1'
const PIXEL =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36'
const INSTAGRAM =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 340.0.0.22.109'

test('user agents name the device, OS and browser', () => {
  assert.deepEqual(parseUserAgent(IPHONE), {
    os: 'iOS 18.1',
    device: 'iPhone',
    browser: 'Safari 18',
    bot: false
  })
  assert.equal(parseUserAgent(PIXEL).device, 'Pixel 8')
  assert.equal(parseUserAgent(PIXEL).browser, 'Chrome 130')
  assert.equal(parseUserAgent(INSTAGRAM).browser, 'Instagram in-app 340')
  assert.equal(parseUserAgent('curl/8.5.0').bot, true)
  assert.equal(likelyIphone('393×852', 3), 'iPhone 14 Pro / 15 / 15 Pro / 16')
})

test('client reports keep known fields only, as short strings', () => {
  const client = clientDetails(
    JSON.stringify({
      screen: '393×852',
      dpr: 3,
      evil: 'x',
      gpu: 'y'.repeat(1000),
      guesses: ['2000-01-01', '<b>', 5],
      hints: { model: 'SM-S918B', junk: 1 }
    })
  )
  assert.equal(client.screen, '393×852')
  assert.equal(client.evil, undefined)
  assert.equal(client.gpu.length, 300)
  assert.deepEqual(client.guesses, ['2000-01-01'])
  assert.equal(client.hints.model, 'SM-S918B')
  assert.equal(clientDetails('not json'), null)
  assert.equal(clientDetails(null), null)
})

test('alerts escape what visitors send', () => {
  const alert = composeAlert({
    outcome: 'incorrect',
    guess: '2000-02-14',
    next: '/',
    details: {
      at: Date.UTC(2026, 9, 22, 12),
      ip: '49.36.1.1',
      userAgent: `${IPHONE}<script>`,
      edge: {},
      hints: {},
      privacy: ''
    },
    client: clientDetails(
      JSON.stringify({
        screen: '393×852',
        dpr: 3,
        timezone: 'Europe/London',
        referrer: '<img src=x onerror=alert(1)>',
        guesses: ['1999-12-31']
      })
    ),
    ip: {
      city: 'Mumbai',
      country: 'India',
      timezone: 'Asia/Kolkata',
      isp: 'Reliance Jio',
      coords: '19.07,72.88'
    }
  })
  assert.match(alert.subject, /Wrong guess: 14 Feb 2000 · Mumbai · iPhone 14 Pro/)
  const { html, text } = renderAlert(alert)
  assert.equal(html.includes('<img src=x'), false)
  assert.equal(html.includes('<script>'), false)
  assert.match(html, /&lt;img src=x/)
  assert.match(text, /Earlier guesses this visit: 31 Dec 1999/)
  assert.match(text, /device clock is Europe\/London, IP is Asia\/Kolkata/)
  assert.match(html, /google\.com\/maps\?q=19\.07%2C72\.88/)
})
