import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-blog",
  themeConfig: './theme.config.tsx',
  readingTime: true,
});

export default withNextra({
  cleanDistDir: true,
  redirects: async () => [
    ...nonPermanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    })),
    ...permanentRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: false,
    })),
  ],
});

const nonPermanentRedirects = [
  ["/gh", "https://github.com/marcklingen"],
  ["/x", "https://x.com/marcklingen"],
  ["/cal", "https://cal.com/marc-kl"],
];

const permanentRedirects = [];
