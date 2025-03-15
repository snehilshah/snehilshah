import yaml from 'yaml'
import fs from 'fs'

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

  const parsed = yaml.parse(frontmatter)
  console.log('parsed:', parsed)
  return parsed
}
