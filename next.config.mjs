import nextra from "nextra";

const withNextra = nextra({});

export default withNextra({
  cleanDistDir: true,
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
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
