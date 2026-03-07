import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import "nextra-theme-blog/style.css";
import "../global.css";
import { PostHogProvider } from "./_components/posthog-provider";

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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <Head
        backgroundColor={{
          dark: "#100f0f",
          light: "#f8f8f5",
        }}
      />
      <body>
        <PostHogProvider>
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
        </PostHogProvider>
      </body>
    </html>
  );
}
