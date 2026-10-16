import localFont from 'next/font/local'

// The listening dashboard: Libron for headings and figures, Product Sans
// (the site's body face) in the weights it needs.
export const libron = localFont({
  src: [
    { path: '../public/fonts/libron/Libron-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/libron/Libron-Italic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/libron/Libron-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-libron',
  display: 'swap'
})

export const productSans = localFont({
  src: [
    { path: '../public/fonts/productSans/ProductSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/productSans/ProductSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/productSans/ProductSans-Bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-product-sans',
  display: 'swap'
})
