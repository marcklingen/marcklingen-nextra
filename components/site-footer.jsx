import { Footer } from 'nextra-theme-blog'
import { FooterSubscribe } from './subscribe'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.5 4.9 18.5 5.2 18.5 5.2c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.95 4.57a10 10 0 0 1-2.83.78 4.93 4.93 0 0 0 2.17-2.72 9.86 9.86 0 0 1-3.13 1.2 4.92 4.92 0 0 0-8.52 3.37c0 .39.04.77.13 1.12A13.98 13.98 0 0 1 1.64 3.18a4.9 4.9 0 0 0 1.52 6.57 4.88 4.88 0 0 1-2.23-.62v.06a4.92 4.92 0 0 0 3.95 4.83 4.93 4.93 0 0 1-2.22.08 4.93 4.93 0 0 0 4.6 3.42A9.87 9.87 0 0 1 .09 19.5 13.92 13.92 0 0 0 7.64 21.7c9.05 0 14-7.5 14-14v-.64a10 10 0 0 0 2.46-2.55Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.44v6.3ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z" />
    </svg>
  )
}

const socials = [
  {
    href: 'https://github.com/marcklingen',
    label: 'GitHub',
    Icon: GitHubIcon
  },
  {
    href: 'https://twitter.com/marcklingen',
    label: 'Twitter',
    Icon: TwitterIcon
  },
  {
    href: 'https://www.linkedin.com/in/marcklingen/',
    label: 'LinkedIn',
    Icon: LinkedInIcon
  }
]

export function SiteFooter() {
  return (
    <Footer>
      <div className="site-footer">
        <span>Marc Klingen</span>
        <div className="site-footer-links">
          <FooterSubscribe />
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
