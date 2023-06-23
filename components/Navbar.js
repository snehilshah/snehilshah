import { FaBars, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function Navbar() {
	const links = ['Home', 'About', 'Experience', 'Contact']
	const [Nav, setNav] = useState(false)

	useEffect(() => {
		let lastScrollTop = 0
		let navbar = document.getElementById('nav')
		window.addEventListener('scroll', () => {
			let scrollTop = window.scrollY || document.documentElement.scrollTop
			if(scrollTop > lastScrollTop){
				navbar.style.top = '-100px'
			}
			else{
				navbar.style.top = '0'
			}
			lastScrollTop = scrollTop
		})
	})

	const HorizontalNavList = ({ link }) => {
		return (
			<li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
				{link}
			</li>
		)
	}
	const VerticalNavList = ({ link }) => {
		return (
			<li className="px-4 capitalize py-6 text-4xl cursor-pointer">{link}</li>
		)
	}

	return (
		<nav id="nav" className='fixed w-full duration-700'>
			<div className="flex justify-between items-center w-full h-20 bg-black text-white px-4">
				<h1 className="text-5xl ml-2">Snehil</h1>
				<ul className="hidden md:flex">
					{links.map((link, index) => {
						return <HorizontalNavList key={index} link={link} />
					})}
				</ul>
				<div
					onClick={() => {
						setNav(!Nav)
					}}
					className="cursor-pointer md:hidden text-gray-500 pr-4 z-10"
				>
					{Nav ? <FaTimes size={30} /> : <FaBars size={30} />}
				</div>
				{Nav && (
					<ul className="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black to-gray-500 text-gray-500">
						{links.map((link, index) => {
							return <VerticalNavList key={index} link={link} />
						})}
					</ul>
				)}
			</div>
		</nav>
	)
}
