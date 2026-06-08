import { siteUrl } from '@/constants/defaultMetadata'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  }
}
