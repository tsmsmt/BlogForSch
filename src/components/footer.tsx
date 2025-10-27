import { SiGithub, SiInstagram, SiX } from '@icons-pack/react-simple-icons'

type Links = Array<{
  href: string
  icon: React.ReactNode
}>

const Footer = () => {
  const links: Links = [
    {
      href: 'https://instagram.com/mm2wwl',
      icon: <SiInstagram className='size-4' />
    }
  ]

  return (
    <footer className='mx-auto max-w-4xl px-6'>
      <div className='flex h-footer items-center justify-between'>
        <p className='text-sm'>© {new Date().getFullYear()} TSMSMT</p>

        <div className='flex items-center gap-4'>
          {links.map((link) => (
            <a key={link.href} href={link.href} target='_blank' rel='noopener noreferrer'>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
