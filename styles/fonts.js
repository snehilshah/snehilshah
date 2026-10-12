import localFont from 'next/font/local'

export const supreme = localFont({
  src: '../public/fonts/supreme/Supreme-Variable.woff2',
  variable: '--font-supreme'
})

export const cabinet = localFont({
  src: '../public/fonts/cabinet/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet'
})

export const copernicus = localFont({
  src: '../public/fonts/corp/copernicus.ttf',
  variable: '--font-copernicus'
})

export const product = localFont({
  src: '../public/fonts/productSans/ProductSans-Regular.woff2',
  variable: '--font-product'
})

export const chubbo = localFont({
  src: '../public/fonts/chubbo/Chubbo-Variable.ttf',
  variable: '--font-chubbo',
  display: 'swap'
})

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
