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
      <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200'>
        {link}
      </li>
    )
  }
  const VerticalNavList = ({ link }) => {
    return (
      <motion.li
        className='px-4 capitalize py-6 text-4xl cursor-pointer'
        variants={{
          open: {
            y: 0,
            opacity: 1
          },
          closed: {
            y: '45%',
            opacity: 0
          }
        }}
      >
        {link}
      </motion.li>
    )
  }

  const topVariants = {
    open: { rotate: 45, y: 7, originX: '16px', originY: '10px' },
    closed: { rotate: 0, y: 0, originX: 0, originY: 0 }
  }

  const centerVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 }
  }

  const bottomVariants = {
    open: { rotate: -45, y: -5, originX: '16px', originY: '22px' },
    closed: { rotate: 0, y: 0, originX: 0, originY: 0 }
  }

  return (
    <nav id='nav' className='fixed w-full duration-700 shadow-2xl z-50'>
      <div className='flex justify-between items-center w-full h-20 bg-stone-950 text-white px-4'>
        <div className='ml-2 pb-5'>
          <svg
            width='122'
            height='78'
            viewBox='0 0 261 163'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <mask
              id='mask0_21_18'
              style={{ maskType: 'alpha' }}
              maskUnits='userSpaceOnUse'
              x='1'
              y='47'
              width='253'
              height='102'
            >
              <path
                d='M59.6328 69.2287C64.6042 68.7753 67.8737 73.9718 68.0393 75.7882C68.0829 76.2663 67.9092 76.4749 67.718 76.4923C59.1137 77.2771 45.9868 97.1757 46.4141 101.86C46.4664 102.434 46.197 102.651 45.8146 102.686C44.5718 102.799 41.7987 100.932 41.6417 99.2108C41.1011 93.2834 45.6439 83.904 50.5265 77.1927C33.597 81.8216 17.3759 101.617 17.9253 107.64C18.6054 115.097 44.5391 109.84 45.8645 124.371C46.7626 134.218 29.2268 145.94 18.4236 146.925C10.5842 147.64 8.23551 140.913 7.98263 138.141C7.86056 136.803 7.96425 134.769 9.36373 135.316C11.8675 137.401 15.014 138.078 18.2645 137.782C28.494 136.849 40.3983 126.798 40.1542 124.121C39.6571 118.671 7.42143 121.419 6.22682 108.321C5.10198 95.9884 29.0485 72.1146 49.6988 70.2311C51.2284 70.0916 53.1495 71.0732 54.7144 72.3764C56.5738 70.5681 58.2943 69.3508 59.6328 69.2287ZM104.517 103.02C104.691 102.811 105.056 102.585 105.438 102.55C106.681 102.437 108.515 103.522 108.602 104.478C108.62 104.67 108.542 104.87 108.368 105.078C106.37 107.478 90.4722 133.991 82.8239 134.689C79.2866 135.011 72.9064 132.701 72.5925 129.26C72.235 125.34 80.5126 107.233 86.5844 95.5936C76.2014 106.47 60.25 127.108 57.9316 134.453C57.7058 135.148 57.5669 135.739 57.6105 136.217C57.7413 137.651 56.794 137.834 55.3945 137.287C53.091 136.34 49.2052 133.899 48.9785 131.413C48.4728 125.868 64.516 92.4973 68.0869 88.3157C68.3476 88.0027 68.8169 87.8635 69.3905 87.8112C72.0674 87.5671 77.2134 90.086 77.414 92.2849C77.4489 92.6673 72.358 100.265 67.3633 109.975C77.0157 97.4304 88.6936 85.9542 93.3782 85.527C96.0551 85.2828 101.21 87.8974 101.41 90.0963C101.445 90.4787 101.376 90.7742 101.115 91.0872C98.1699 94.7298 81.5792 128.44 84.0649 128.213C87.6022 127.891 102.779 105.106 104.517 103.02ZM140.787 99.7115C140.96 99.5028 141.325 99.2767 141.708 99.2418C142.951 99.1285 144.689 100.223 144.776 101.179C144.794 101.37 144.716 101.57 144.542 101.779C140.285 106.891 127.22 130.64 110.298 132.183C105.04 132.663 98.1893 127.311 97.7097 122.052C96.7505 111.536 113.873 83.6577 123.051 82.8206C124.676 82.6723 126.91 83.9145 128.388 85.3221C131.256 85.0605 135.368 85.7459 135.655 88.9008C136.58 99.0348 119.716 119.178 110.251 120.041C109.582 120.102 108.999 120.059 108.408 119.92C108.139 121.198 108.061 122.458 108.149 123.414C108.349 125.613 109.523 126.855 112.008 126.629C123.098 125.617 135.304 106.188 140.787 99.7115ZM127.034 89.4944C122.089 92.3553 113.862 104.674 110.023 114.374C110.119 114.366 110.319 114.444 110.51 114.426C116.151 113.912 127.401 95.6304 127.034 89.4944ZM187.725 95.4303C187.899 95.2216 188.264 94.9955 188.647 94.9607C189.889 94.8473 191.724 95.9332 191.811 96.8892C191.828 97.0804 191.75 97.2803 191.576 97.489C189.569 99.7928 173.681 126.402 166.032 127.1C162.495 127.422 156.115 125.112 155.792 121.575C155.435 117.655 163.955 99.0442 170.036 87.5002C158.184 99.185 138.445 123.735 138.907 128.802C139.003 129.854 138.751 130.263 138.368 130.298C136.839 130.437 130.571 127.249 130.266 123.903C129.769 118.454 159.416 59.8385 162.987 55.6569C163.247 55.3439 163.708 55.1091 164.281 55.0568C166.958 54.8127 172.113 57.4273 172.314 59.6261C172.34 59.9129 172.279 60.3041 172.018 60.617C169.673 63.4338 157.572 85.0703 148.738 103.421C159.12 90.4238 171.902 78.365 176.587 77.9377C179.263 77.6936 184.418 80.3081 184.619 82.507C184.654 82.8894 184.584 83.185 184.324 83.4979C180.77 87.8708 166.759 117.104 167.056 120.355C167.073 120.546 167.082 120.642 167.273 120.624C170.811 120.301 185.988 97.5167 187.725 95.4303ZM210.388 93.2669C210.562 93.0582 210.936 92.9277 211.222 92.9016C212.465 92.7882 214.291 93.7785 214.387 94.8301C214.404 95.0213 214.326 95.2213 214.152 95.4299C212.241 97.725 196.352 124.334 188.704 125.032C185.071 125.363 178.777 122.949 178.464 119.507C177.967 114.058 192.082 85.9715 195.557 81.7986C195.818 81.4856 196.287 81.3464 196.861 81.2941C199.538 81.0499 204.692 83.6645 204.893 85.8634C204.919 86.1502 204.858 86.5413 204.598 86.8543C201.122 91.0272 189.248 115.149 189.527 118.209C189.545 118.4 189.649 118.487 189.84 118.469C193.473 118.138 208.65 95.3533 210.388 93.2669ZM211.028 51.6608C217.146 51.1027 221.041 55.7602 221.268 58.2458C221.347 59.1063 221.016 59.7148 220.156 59.7933C217.192 60.0636 211.72 69.817 211.842 71.1554C211.894 71.729 211.347 72.0682 210.486 72.1466C208.096 72.3646 203.411 70.6712 203.071 66.9427C202.862 64.6482 206.63 52.0619 211.028 51.6608ZM216.462 122.5C212.829 122.831 205.945 121.338 204.988 116.124C203.334 107.502 220.936 57.4085 235.118 49.0779C236.213 48.3997 237.074 48.3212 237.952 48.4339C240.003 48.7288 242.68 50.6054 243.898 52.3259C245.914 53.2988 247.219 55.9753 247.158 57.4268C247.108 64.2757 231.721 81.5849 220.382 93.6085C216.414 105.056 214.591 114.67 216.408 115.564C221.137 117.736 236.322 92.9258 238.06 90.8394C238.234 90.6307 238.598 90.4047 238.981 90.3698C240.224 90.2564 242.058 91.3423 242.145 92.2983C242.163 92.4895 242.189 92.7764 242.015 92.985C240.121 95.4713 224.11 121.802 216.462 122.5ZM225.063 81.5173C232.961 71.9283 240.702 61.6788 241.213 56.7159C235.452 61.1937 229.701 71.0689 225.063 81.5173Z'
                fill='black'
              />
              <path
                d='M70 147.418C115.09 131.656 164.966 141.806 181.929 143.248'
                stroke='black'
                stroke-width='2'
              />
            </mask>
            <g mask='url(#mask0_21_18)'>
              <rect
                x='-2.32812'
                y='12.2773'
                width='268'
                height='185'
                transform='rotate(4.85951 -2.32812 12.2773)'
                fill='url(#paint0_linear_21_18)'
              />
            </g>
            <defs>
              <linearGradient
                id='paint0_linear_21_18'
                x1='-2.32813'
                y1='15.2773'
                x2='265.672'
                y2='197.277'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-color='#F5F5F5' />
                <stop offset='1' stop-color='#78716C' />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <ul className='hidden md:flex'>
          {links.map((link, index) => {
            return <HorizontalNavList key={index} link={link} />
          })}
        </ul>
        <div
          onClick={() => {
            setMobileNav(!mobileNav)
          }}
          className='cursor-pointer md:hidden text-gray-500 pr-4 z-10'
        >
          <svg
            width='48'
            height='48'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={topVariants}
              transition={{ duration: 0.7 }}
              x='6'
              y='9'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
            />
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={centerVariants}
              transition={{ duration: 0.4 }}
              x='6'
              y='15'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
            />
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={bottomVariants}
              transition={{ duration: 0.4 }}
              x='6'
              y='21'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
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
                    duration: 0.5
                  }
                },
                closed: {
                  y: '-100%',
                  transition: {
                    when: 'afterChildren',
                    duration: 0.5
                  }
                }
              }}
              initial='closed'
              animate={'open'}
              exit={'closed'}
              className='flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-3/4 bg-gradient-to-b from-black to-stone-900 opacity-90'
            >
              <ul className='text-center'>
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
