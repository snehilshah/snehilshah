import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import yaml from 'yaml'
import fs from 'fs'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getFrontMatter(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const delimitter = '---'

  if (!fileContent.startsWith(delimitter)) {
    return {}
  }
  const openingIndex = fileContent.indexOf(delimitter)
  const closingIndex = fileContent.indexOf('\n' + delimitter, openingIndex + 1)

  const frontmatter = fileContent
    .slice(openingIndex + delimitter.length, closingIndex)
    .trim()

  return yaml.parse(frontmatter)
}
