'use client'
import { useEffect } from 'react'

/** On narrow screens the tabs scroll sideways; bring the current one into view. */
export function ActiveTab() {
  useEffect(() => {
    const center = () => {
      const tab = document.querySelector('#goonj .tabs [aria-current="page"]')
      const tabs = tab?.parentElement
      if (!tabs || tabs.scrollWidth <= tabs.clientWidth) return
      const offset = tab.getBoundingClientRect().left - tabs.getBoundingClientRect().left
      tabs.scrollLeft += offset - (tabs.clientWidth - tab.offsetWidth) / 2
    }
    center()
    // Widths change once the web fonts arrive.
    document.fonts?.ready.then(center)
  })
  return null
}
