/**
 * Synced lyrics, from LRC: "[mm:ss.xx] line", several stamps per line
 * allowed, optional word times "<mm:ss.xx>word" (enhanced LRC) and an
 * [offset:ms] tag. Returns the lines in time order, with instrumental
 * breaks (empty lines, and an intro before the first words) as gaps.
 * Empty when there's nothing to sing along to.
 */
export function parseLrc(text, duration) {
  if (!text) return []
  let offset = 0
  const lines = []
  const stamp = /\[(\d+):(\d+(?:\.\d+)?)\]/g
  for (const raw of text.split(/\r?\n/)) {
    const off = raw.match(/^\[offset:\s*([+-]?\d+)\s*\]/i)
    if (off) {
      offset = Number(off[1]) / 1000
      continue
    }
    const times = [...raw.matchAll(stamp)].map((m) => Number(m[1]) * 60 + Number(m[2]))
    if (!times.length) continue
    let body = raw.replace(stamp, '').trim()
    let words = null
    if (/<\d+:\d+(?:\.\d+)?>/.test(body)) {
      words = [...body.matchAll(/<(\d+):(\d+(?:\.\d+)?)>([^<]*)/g)]
        .filter((m) => m[3])
        .map((m) => ({ t: Number(m[1]) * 60 + Number(m[2]) - offset, text: m[3] }))
      body = words.map((w) => w.text).join('').trim()
    }
    for (const t of times) lines.push({ t: Math.max(0, t - offset), text: body, ...(words && { words }) })
  }
  lines.sort((a, b) => a.t - b.t)
  if (!lines.some((l) => l.text)) return []
  const items = []
  if (lines[0].t > 4) items.push({ t: 0, gap: true })
  for (const l of lines) items.push(l.text ? l : { t: l.t, gap: true })
  items.forEach((it, i) => {
    if (it.gap) it.end = items[i + 1]?.t ?? duration
  })
  // A break too short to show is just a pause between lines.
  return items.filter((it) => !it.gap || it.end - it.t > 3)
}
