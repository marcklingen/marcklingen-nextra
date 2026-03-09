import { Github, Linkedin, Twitter } from 'lucide-react'
import { Footer } from 'nextra-theme-blog'

const socials = [
  {
    href: 'https://github.com/marcklingen',
    label: 'GitHub',
    Icon: Github
  },
  {
    href: 'https://twitter.com/marcklingen',
    label: 'Twitter',
    Icon: Twitter
  },
  {
    href: 'https://www.linkedin.com/in/marcklingen/',
    label: 'LinkedIn',
    Icon: Linkedin
  }
]

export function SiteFooter() {
  return (
    <Footer>
      <div className="site-footer">
        <span>Marc Klingen</span>
        <div className="site-footer-links">
          <a className="site-footer-rss" href="/rss.xml">
            RSS
          </a>
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </Footer>
  )
}
