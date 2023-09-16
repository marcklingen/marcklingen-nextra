import { NextraBlogTheme } from "nextra-theme-blog";

const config: NextraBlogTheme = {
  footer: <p>Marc Klingen</p>,
  head: ({ title, meta }) => (
    <>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.tag && <meta name="keywords" content={meta.tag} />}
      {meta.author && <meta name="author" content={meta.author} />}
    </>
  ),
  readMore: "Read More →",
  postFooter: null,
  darkMode: true,
  navs: [
    {
      url: "https://github.com",
      name: "GitHub",
    },
  ],
};

export default config;
