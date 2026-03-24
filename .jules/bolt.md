## 2024-05-20 - Missing Cleanup and Passive Flags on Scroll Listeners

**Learning:** Found a critical performance anti-pattern in `components/Index/Navbar.js` where a `scroll` event listener lacked a `removeEventListener` cleanup in `useEffect`, leading to memory leaks on unmount. Furthermore, it did not use the `{ passive: true }` flag or `requestAnimationFrame` for throttling DOM updates, leading to layout thrashing and scroll-blocking behavior.
**Action:** Always ensure high-frequency event listeners like `scroll` or `mousemove` include a cleanup function in `useEffect`, use the `{ passive: true }` flag to inform the browser that the listener won't call `preventDefault()`, and throttle DOM writes using `requestAnimationFrame` to maintain a high framerate.

## 2024-05-20 - Global Prettier Runs
**Learning:** Found that running `prettier --write .` globally can format unrelated files and pollute Git history, leading to messy PRs and making code review difficult.
**Action:** Always target specific modified files when formatting code (`prettier --write <file>`) to ensure changes remain atomic and clean.
