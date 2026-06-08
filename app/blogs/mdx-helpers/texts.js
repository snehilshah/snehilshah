const COLORS = {
  rose: 'hl-rose',
  blue: 'hl-blue',
  green: 'hl-green',
  amber: 'hl-amber'
}

export const Standout = ({ text, color = 'rose', children }) => {
  return <span className={`hl ${COLORS[color] || COLORS.rose}`}>{text ?? children}</span>
}
