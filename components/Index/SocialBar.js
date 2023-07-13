import { FaGithub, FaLinkedin, FaMailBulk, FaPersonBooth } from 'react-icons/fa'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { AiFillMail } from 'react-icons/ai'
import Link from 'next/link'

const SocialBar = () => {
  const socialLinks = [
    {
      id: 1,
      icon: <FaLinkedin className='text-2xl' />,

      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/snehil-shah-7794a9209/',
      style: 'rounded-tl-lg'
    },
    {
      id: 2,
      icon: <FaGithub className='text-2xl' />,
      text: 'Github',
      href: 'https://github.com/srshah27'
    },
    {
      id: 3,
      icon: <AiFillMail className='text-2xl' />,
      text: 'Mail',
      href: 'mailto:snehilshah27@gmail.com'
    },
    {
      id: 4,
      icon: <BsFillPersonVcardFill className='text-2xl' />,
      text: 'Resume',
      href: 'https://youtu.be/j5a0jTc9S10',
      style: 'rounded-bl-lg'
    }
  ]

  return (
    <div className='flex flex-col top-[35%] right-0 fixed z-50'>
      <ul>
        {socialLinks.map(({ icon, text, href, style = '', id }) => (
          <li
            key={id}
            className={
              'flex justify-between items-center w-40 h-14 px-4 translate-x-[100px] hover:translate-x-[10px] hover:rounded-lg duration-300 bg-stone-600/80' +
              ' ' +
              style
            }
          >
            <div className='flex justify-between items-center w-full'>
              {icon}
              <Link href={href} target='_blank' rel='noreferrer'>
                {text}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialBar
