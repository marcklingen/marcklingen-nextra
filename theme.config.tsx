import { NextraBlogTheme } from "nextra-theme-blog";
import { Github, Twitter, Linkedin } from "lucide-react";

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

const config: NextraBlogTheme = {
  head: ({ title, meta }) => (
    <>
      <title>{title.includes("About") ? "Marc Klingen" : title}</title>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  footer: (
    <footer className="flex justify-between items-center text-xs text-primary/60 border-t border-primary/20 pt-3 mt-14">
      <span>Marc Klingen</span>
      <div className="flex gap-4">
        {socials.map(({ url, name, Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </footer>
  ),
  readMore: "Read More →",
  darkMode: true,
  titleSuffix: " — Marc Klingen",
};

export default config;
