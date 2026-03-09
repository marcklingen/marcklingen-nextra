import type { Metadata, Viewport } from "next";
import { Github, Linkedin, Twitter } from "lucide-react";
import { getPageMap } from "nextra/page-map";
import { Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "../global.css";

const socials = [
  {
    url: "https://github.com/marcklingen",
    name: "GitHub",
    Icon: Github,
  },
  {
    url: "https://twitter.com/marcklingen",
    name: "Twitter",
    Icon: Twitter,
  },
  {
    url: "https://www.linkedin.com/in/marcklingen/",
    name: "LinkedIn",
    Icon: Linkedin,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL("https://marcklingen.com"),
  title: {
    default: "Marc Klingen",
    template: "%s — Marc Klingen",
  },
  description:
    "Developer and maker from Berlin. Co-founder of Langfuse writing about projects, software, and technology.",
  authors: [{ name: "Marc Klingen" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0f" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Layout nextThemes={{ defaultTheme: "light" }}>
          <Navbar pageMap={pageMap}>
            <ThemeSwitch />
          </Navbar>
          {children}
          <footer
            className="site-footer"
            data-pagefind-ignore="all"
          >
            <span>Marc Klingen</span>
            <div className="site-socials">
              {socials.map(({ url, name, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-social-link"
                  aria-label={name}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </footer>
        </Layout>
      </body>
    </html>
  );
}
