import fs from 'fs'
import path from 'path'
import { getFrontMatter } from '@/lib/helpers'

const POSTS_DIR = 'posts'

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// strip frontmatter + rough mdx/markdown syntax, then count words
export function readingTime(raw) {
  const body = raw.replace(/^---[\s\S]*?---/, '')
  const words = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// h2 headings only (## ...), ignoring fenced code blocks
export function getToc(raw) {
  const body = raw.replace(/^---[\s\S]*?---/, '')
  const toc = []
  let inFence = false
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const m = /^##\s+(.+?)\s*$/.exec(line)
    if (m) {
      const text = m[1].replace(/[*_`]/g, '').trim()
      toc.push({ id: slugify(text), text })
    }
  }
  return toc
}

function readPost(file) {
  const slug = file.replace(/\.mdx$/, '')
  const filePath = path.join(POSTS_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const frontmatter = getFrontMatter(filePath)
  return {
    slug,
    frontmatter: { topic: 'General', ...frontmatter },
    read: readingTime(raw),
    raw
  }
}

// all posts, newest first (lightweight — no raw body)
export function getAllPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(file => {
      const { slug, frontmatter, read } = readPost(file)
      return { slug, frontmatter, read }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    )
}

// single post with raw body (for toc/read on the post page)
export function getPost(slug) {
  return readPost(slug + '.mdx')
}
