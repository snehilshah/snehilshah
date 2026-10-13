// Figures in full: whole numbers with separators and units in words, never
// "2K" or "3h".

const whole = new Intl.NumberFormat('en-IN')

export const count = (n) => whole.format(n ?? 0)

/** "1 play", "1,204 plays"; any word: unit(3, 'day') = "3 days". */
export const unit = (n, word) => `${count(n)} ${n === 1 ? word : `${word}s`}`
export const plays = (n) => unit(n, 'play')

/**
 * Time listened, in words: "12 minutes", "3 hours 20 minutes",
 * "8 days 6 hours". parts = 1 keeps only the largest unit, for tight spots.
 */
export function listening(ms, parts = 2) {
  const m = Math.round((ms ?? 0) / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  const all =
    m < 60 ? [unit(m, 'minute')] : h < 24 ? [unit(h, 'hour'), m % 60 && unit(m % 60, 'minute')] : [unit(d, 'day'), h % 24 && unit(h % 24, 'hour')]
  return all.filter(Boolean).slice(0, parts).join(' ')
}

/** Whole hours, for big headline figures. */
export const hours = (ms) => count(Math.round((ms ?? 0) / 3600000))

/** A time figure split for a tile: { value: '12', label: 'hours' }, minutes under an hour. */
export function timeFigure(ms) {
  const [value, label] = totalTime(ms).split(' ')
  return { value, label }
}

/** Total time as hours ("1,204 hours"), or minutes under an hour. */
export const totalTime = (ms) => (ms >= 3600000 ? unit(Math.round(ms / 3600000), 'hour') : unit(Math.round((ms ?? 0) / 60000), 'minute'))

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

/** Relative: "just now", "12 minutes ago", "3 hours ago", then the date. */
export function ago(ms, now = Date.now()) {
  const m = Math.floor((now - ms) / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${unit(m, 'minute')} ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${unit(h, 'hour')} ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${unit(d, 'day')} ago`
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
export const hourLabel = (h) => `${h % 12 || 12} ${h < 12 ? 'am' : 'pm'}`
