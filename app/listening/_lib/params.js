/** Route keys hold spaces and "|": decode what the router leaves encoded. */
export function routeKey(raw) {
  try {
    return raw.includes('%') ? decodeURIComponent(raw) : raw
  } catch {
    return raw
  }
}
