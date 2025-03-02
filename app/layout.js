import "@/styles/globals.tail.css";
import { supreme, prsans } from '@/styles/fonts';
import { Metadata } from 'next'

const fontClasses = [supreme.variable, prsans.variable].join(' ');
export const metadata = {
  title: "Snehil Shah | Portfolio",
  description: "Portfolio Website for Snehil Shah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={`${fontClasses} font-prsans`}>
        {children}
      </body>
    </html>
  )
}