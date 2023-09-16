import { NextraBlogTheme } from "nextra-theme-blog";

const config: NextraBlogTheme = {
  footer: null,
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
  readMore: "Read More →",
  darkMode: true,
  navs: [
    {
      url: "https://github.com/marcklingen",
      name: "GitHub",
    },
    {
      url: "https://twitter.com/marcklingen",
      name: "Twitter",
    },
    {
      url: "https://www.linkedin.com/in/marcklingen/",
      name: "LinkedIn",
    },
  ],
  titleSuffix: " — Marc Klingen",
};

export default config;
