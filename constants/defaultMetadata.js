export const siteUrl = 'https://www.snehilshah.com'

export const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Snehil Shah',
    default: 'Snehil Shah'
  },
  description: 'Portfolio Website for Snehil Shah',
  keywords: ['Snehil Shah', 'Snehil', 'Portfolio', 'Developer', 'Engineer'],
  authors: [{ name: 'Snehil Shah', url: siteUrl }],
  creator: 'Snehil Shah',
  publisher: 'Snehil Shah',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' }
  },
  openGraph: {
    title: 'Snehil Shah | Portfolio',
    description: 'Portfolio Website for Snehil Shah',
    url: siteUrl,
    siteName: 'Snehil Shah',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/SnehilImage3x.jpg',
        width: 800,
        height: 600,
        alt: 'Snehil Shah'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snehil Shah | Portfolio',
    description: "Showcasing Snehil Shah's work and projects",
    images: ['/SnehilImage3x.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}
