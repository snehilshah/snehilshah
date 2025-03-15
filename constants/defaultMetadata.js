export const defaultMetadata = {
  title: {
    template: '%s | Snehil Shah',
    default: 'Snehil Shah'
  },
  description: 'Portfolio Website for Snehil Shah',
  keywords: ['Snehil Shah', 'Snehil', 'Portfolio', 'Developer', 'Engineer'],
  openGraph: {
    title: 'Snehil Shah | Portfolio',
    description: 'Portfolio Website for Snehil Shah',
    url: 'https://www.snehilshah.com',
    siteName: 'Snehil Shah',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.snehilshah.com/SnehilImage3x.jpg',
        width: 800,
        height: 600
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snehil Shah | Portfolio',
    description: "Showcasing Snehil Shah's work and projects"
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
