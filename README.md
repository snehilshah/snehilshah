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

`pnpm-workspace.yaml` contains dependency overrides and explicit install-script
permissions. The shared store reuses packages across installs; Docker also caches
that store between builds.

```sh
docker build -t snehilshah .
docker run --rm -p 3000:3000 snehilshah
```
