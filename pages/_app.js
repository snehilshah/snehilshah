import "@/styles/globals.tail.css"
import localFont from "next/font/local"

const cabinet = localFont({
	src: "../public/fonts/cabinet/CabinetGrotesk-Variable.woff2",
	variable: "--font-cabinet",
})

const supreme = localFont({
	src: "../public/fonts/supreme/Supreme-Variable.woff2",
	// variable: "--font-supreme",
})

export default function App({ Component, pageProps }) {
	return (
		<main className={`${supreme.className} ${cabinet.variable}`}>
			<Component {...pageProps} />
		</main>
	)
}
