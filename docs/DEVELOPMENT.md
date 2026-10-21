# Development

Use Node.js 24 (see `.nvmrc`) and pnpm 12.11.2, pinned in `package.json`.

```sh
npm install --global pnpm@12.11.2
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm lint` and `pnpm build` before pushing. Use `pnpm start` to serve a
production build. Commit `pnpm-lock.yaml` when dependencies change.

## Private music page

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
configuration keeps the gate locked. Rotating the secret revokes all sessions. To sign
everyone out without a new secret, bump `VERSION` in `lib/music-access.js`.
The proxy checks page requests, including navigation/prefetch payloads, before
the existing cached pages are served. Browser/CDN responses are private and
uncacheable; the server's listening-data cache remains available.

Run `pnpm test:music-access` for session and return-path checks. Preview at
`/listening/unlock` locally, or `/unlock` on the configured music host. The form
has a best-effort limit of ten submissions per IP per 15 minutes per server
instance. For multiple instances, configure a shared rate limit at the reverse
proxy/WAF and ensure it overwrites the client IP header. This gate covers this
website only. The Goonj API (goonj.snehilshah.com/v1/...) and audio storage
are hosted separately and stay public: anyone who calls the API directly can
read the listening data.

### Attempt emails

Every birthday attempt (right or wrong, and the first one past the guess limit)
emails the owner through Resend, after the response is sent. Each email has
what is known about the visitor: IP, ISP/ASN, reverse DNS and city-level
location (from the hosting edge and [ipwho.is](https://ipwho.is), falling back
to ipinfo.io), VPN signs (device vs IP timezone, hosting providers), device,
OS, browser, screen, GPU, client hints, earlier wrong guesses in that visit,
time on the page, and a random per-browser ID with a visit count (kept in
`localStorage`). Location is IP-based only; visitors see no prompt. Each server
instance sends at most 40 emails an hour.

```dotenv
RESEND_API_KEY=<Resend API key>
MUSIC_ALERT_TO=you@example.com          # comma-separated for several
MUSIC_ALERT_FROM="Music gate <music@snehilshah.com>"   # a Resend-verified domain
MUSIC_ALERT_TIMEZONE=Asia/Kolkata       # optional, for the time in the email
```

Without `RESEND_API_KEY` or `MUSIC_ALERT_TO`, no emails are sent and the gate
works as before.

## Dependencies and Docker

`pnpm-workspace.yaml` contains dependency overrides and explicit install-script
permissions. The shared store reuses packages across installs; Docker also caches
that store between builds.

```sh
docker build -t snehilshah .
docker run --rm -p 3000:3000 snehilshah
```
