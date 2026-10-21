import localFont from 'next/font/local'

// The listening dashboard: Product Sans (the site's body face) in the
// weights it needs, and Bricolage Grotesque for headings and figures.
export const productSans = localFont({
  src: [
    { path: '../public/fonts/productSans/ProductSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/productSans/ProductSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/productSans/ProductSans-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-product-sans',
  display: 'swap'
})

// Bricolage Grotesque for headings and figures. One variable file,
// trimmed to Latin and fixed at its display optical size; every weight
// (200–800) and width (75–100%) is kept.
export const bricolage = localFont({
  src: [{ path: '../public/fonts/bricolage/BricolageGrotesque.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-bricolage',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }]
})
