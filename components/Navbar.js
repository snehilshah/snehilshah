import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
	const links = ['Home', 'About', 'Experience', 'Contact']
	const [mobileNav, setMobileNav] = useState(false)

	useEffect(() => {
		let lastScrollTop = 0
		let navbar = document.getElementById('nav')
		window.addEventListener('scroll', () => {
			let scrollTop = window.scrollY || document.documentElement.scrollTop
			if (scrollTop > lastScrollTop) {
				navbar.style.top = '-100px'
			} else {
				navbar.style.top = '0'
			}
			lastScrollTop = scrollTop
		})
	}, [])

	useEffect(() => {
		let navbar = document.getElementById('nav')
		navbar.style.top = '-100px'
		setTimeout(() => {
			navbar.style.top = '0'
		}, 3000)
	}, [])
	

	const HorizontalNavList = ({ link }) => {
		return (
			<li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
				{link}
			</li>
		)
	}
	const VerticalNavList = ({ link }) => {
		return (
			<motion.li
				className="px-4 capitalize py-6 text-4xl cursor-pointer"
				variants={{
					open: {
						y: 0,
						opacity: 1,
					},
					closed: {
						y: '45%',
						opacity: 0,
					},
				}}
			>
				{link}
			</motion.li>
		)
	}

	const topVariants = {
		open: { rotate: 45, y: 7, originX: '16px', originY: '10px' },
		closed: { rotate: 0, y: 0, originX: 0, originY: 0 },
	}

	const centerVariants = {
		open: { opacity: 0 },
		closed: { opacity: 1 },
	}

	const bottomVariants = {
		open: { rotate: -45, y: -5, originX: '16px', originY: '22px' },
		closed: { rotate: 0, y: 0, originX: 0, originY: 0 },
	}

	return (
		<nav id="nav" className="fixed w-full duration-700 shadow-2xl">
			<div className="flex justify-between items-center w-full h-20 bg-stone-900 text-white px-4">
				<h1 className="text-5xl ml-2">Snehil</h1>
				<ul className="hidden md:flex">
					{links.map((link, index) => {
						return <HorizontalNavList key={index} link={link} />
					})}
				</ul>
				<div
					onClick={() => {
						setMobileNav(!mobileNav)
					}}
					className="cursor-pointer md:hidden text-gray-500 pr-4 z-10"
				>
					<svg
						width="48"
						height="48"
						viewBox="0 0 32 32"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<motion.rect
							animate={mobileNav ? 'open' : 'closed'}
							variants={topVariants}
							transition={{ duration: 0.7 }}
							x="6"
							y="9"
							width="20"
							height="2"
							rx="1"
							fill="currentColor"
						/>
						<motion.rect
							animate={mobileNav ? 'open' : 'closed'}
							variants={centerVariants}
							transition={{ duration: 0.4 }}
							x="6"
							y="15"
							width="20"
							height="2"
							rx="1"
							fill="currentColor"
						/>
						<motion.rect
							animate={mobileNav ? 'open' : 'closed'}
							variants={bottomVariants}
							transition={{ duration: 0.4 }}
							x="6"
							y="21"
							width="20"
							height="2"
							rx="1"
							fill="currentColor"
						/>
					</svg>
				</div>
				<AnimatePresence>
					{mobileNav && (
						<motion.div
							variants={{
								open: {
									y: '0%',
									transition: {
										when: 'beforeChildren',
										duration: 0.5,
									},
								},
								closed: {
									y: '-100%',
									transition: {
										when: 'afterChildren',
										duration: 0.5,
									},
								},
							}}
							initial="closed"
							animate={'open'}
							exit={'closed'}
							className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-3/4 bg-gradient-to-b from-black to-gray-500 opacity-90"
						>
							<ul className="text-center">
								{links.map((link, index) => {
									return <VerticalNavList key={index} link={link} />
								})}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</nav>
	)
}
