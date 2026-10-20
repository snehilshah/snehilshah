<h1 align="center">Hello World 👋🏻, I'm Snehil Shah</h1></br>

<p align="center">I'm a tech enthusiast ⚡</p>
<p align="center">
I love to talk about latest bleeding technologies on my <a href="https://www.snehilshah.com/blogs" target="_blank">blogs</a>🚀
</p>
<p align="center">
 <a href="https://snehilshah.com" target="_blank"><img alt="" src="https://img.shields.io/badge/Portfolio-000?logo=archlinux&logoColor=0d9488&style=for-the-badge" style="vertical-align:center" /></a>
<a href="https://linkedin.com/in/VishwaGauravIn" target="_blank"><img alt="" src="https://img.shields.io/badge/LinkedIn-000?logo=linkedin&logoColor=0A66C2&style=for-the-badge" style="vertical-align:center" /></a>
<a href="https://stackoverflow.com/users/8958122/snehil-shah" target="_blank"><img alt="" src="https://img.shields.io/badge/StackOverflow-000?logo=stackoverflow&logoColor=f59e0b&style=for-the-badge" style="vertical-align:center" /></a>
<a href="https://twitter.com/snehil_shah27" target="_blank"><img alt="" src="https://img.shields.io/badge/Twitter-000?logo=Twitter&logoColor=1DA1F2&style=for-the-badge" style="vertical-align:center" /></a>
</p>

<!--
[![](https://visitcount.itsvg.in/api?id=snehilshah&label=Profile%20Views&color=8&icon=2&pretty=true)](https://visitcount.itsvg.in) -->

## Development

Use Node.js 24 (see `.nvmrc`) and pnpm 12.11.2, pinned in `package.json`.

```sh
npm install --global pnpm@12.11.2
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm lint` and `pnpm build` before pushing. Use `pnpm start` to serve a
production build. Commit `pnpm-lock.yaml` when dependencies change.

### Private music page

The music host and every `/listening` route require a signed access cookie.
Visitors pick Snehil's birthday in a themed calendar; successful access lasts
seven days. **Lock music** in the footer clears access. The date is checked only
on the server and is never included in the browser bundle or access cookie.
Month and year choices use themed grids. Incorrect dates stay on the same
screen with a small shake (or a static indicator for reduced motion), and a
valid cookie skips the unlock screen even after restarting the browser.
This is a personal privacy gate: anyone who knows the birthday can enter.

Set these server environment variables locally in `.env.local` and on the
production service (including the runtime environment for Docker):

```dotenv
MUSIC_BIRTHDATE=YYYY-MM-DD
MUSIC_SESSION_SECRET=<a random secret of at least 32 characters>
# Existing host setting, if serving music at its own domain:
LISTENING_HOST=music.snehilshah.com
```

Generate a secret with `openssl rand -hex 32`. Keep both access variables
server-only; never use a `NEXT_PUBLIC_` prefix or commit `.env.local`. Missing
configuration keeps the gate locked. Rotating the secret revokes all sessions.
The proxy checks page requests, including navigation/prefetch payloads, before
the existing cached pages are served. Browser/CDN responses are private and
uncacheable; the server's listening-data cache remains available.

Run `pnpm test:music-access` for session and return-path checks. Preview at
`/listening/unlock` locally, or `/unlock` on the configured music host. The form
has a best-effort limit of ten submissions per IP per 15 minutes per server
instance. For multiple instances, configure a shared rate limit at the reverse
proxy/WAF and ensure it overwrites the client IP header. This gate covers this
website; the separately hosted Goonj API and audio storage retain their own
access policies.

`pnpm-workspace.yaml` contains dependency overrides and explicit install-script
permissions. The shared store reuses packages across installs; Docker also caches
that store between builds.

```sh
docker build -t snehilshah .
docker run --rm -p 3000:3000 snehilshah
```
