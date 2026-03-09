import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import 'nextra-theme-blog/style.css'
import '../global.css'
import { SiteFooter } from '../components/site-footer'

export const metadata = {
  metadataBase: new URL('https://marcklingen.com'),
  title: {
    default: 'Marc Klingen',
    template: '%s — Marc Klingen'
  },
  description: 'Developer and maker from Berlin.',
  icons: {
    icon: '/favicon.ico'
  }
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" suppressHydrationWarning>
      <Head backgroundColor={{ dark: '#100f0f', light: '#f8fafc' }} />
      <body>
        <Layout
          nextThemes={{
            defaultTheme: 'light',
            disableTransitionOnChange: true
          }}
        >
          <Navbar pageMap={pageMap}>
            <ThemeSwitch />
          </Navbar>
          {children}
          <SiteFooter />
        </Layout>
      </body>
    </html>
  )
}
