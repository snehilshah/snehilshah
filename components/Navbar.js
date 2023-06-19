import Link from "next/link"

export default function Navbar() {
	return (
		<header>
			<nav className="bg-transparent flex justify-around gap-96 bg-red-600">
				<div id="logo">
					<Link href="/">
						<div className="font-supreme">Alef</div>
					</Link>
				</div>
				<ul>
					<li>
						<Link href="/" className="font-supreme">
							Home
						</Link>
					</li>
					<li>
						<Link href="/" className="font-cabinet">About</Link>
					</li>
					<li>
						<Link href="/">Work</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
