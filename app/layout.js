import "@/styles/globals.tail.css";

export const metadata = {
  title: "Snehil Shah | Portfolio",
  description: "Portfolio Website for Snehil Shah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}