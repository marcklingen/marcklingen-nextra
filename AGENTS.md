# AGENTS.md

## Purpose

This repo is a small personal site built with Next.js App Router and Nextra's blog theme. Most changes are either:

- content edits in MDX files under `app/`
- light styling changes in `global.css`
- small React component/config updates

Keep changes minimal and consistent with the existing site. Prefer editing existing theme hooks and content files over introducing new abstractions.

## Stack

- Node version: check `.nvmrc`
- Package manager: `pnpm` (`packageManager` is pinned in `package.json`)
- Framework: Next.js 16 App Router
- Content/theme: `nextra` + `nextra-theme-blog`
- Language mix: mostly JavaScript/JSX + MDX, with TypeScript config present

## Common Commands

- Install: `pnpm install`
- Dev server: `pnpm dev`
  - runs on `http://localhost:3334`
- Production build: `pnpm build`
- Start built app: `pnpm start`

There is currently no dedicated lint or test script. For most changes, validate with a production build.

Build note:

- In this Codex worktree, Nextra may warn that it "Failed to get the last modified timestamp from Git" for MDX files.
- Treat that as non-fatal if the build still completes successfully.

## Repo Map

- `app/layout.jsx`
  - root layout, navbar/theme switch/footer wiring, site-wide metadata
- `app/page.mdx`
  - homepage/about page
- `app/projects/page.mdx`
  - projects page
- `app/posts/page.jsx`
  - posts index page
- `app/posts/get-posts.js`
  - derives/sorts posts from the Nextra page map
- `app/posts/**/page.mdx`
  - blog posts; frontmatter drives listing and RSS
- `app/rss.xml/route.js`
  - RSS generation from post frontmatter
- `app/feed.xml/route.js`
  - alias route re-exporting RSS
- `mdx-components.jsx`
  - shared MDX wrapper; renders page title/date/author from frontmatter
- `components/site-footer.jsx`
  - footer links/socials
- `global.css`
  - site palette and theme overrides
- `app/_meta.global.js`
  - top-level nav/page metadata for Nextra
- `public/images/posts/...`
  - post images referenced from MDX

## Content Conventions

### Pages and posts

- Content pages live directly in `app/**/page.mdx`.
- Posts live in their own folders under `app/posts/<slug>/page.mdx`.
- Use frontmatter at the top of MDX files.

Typical post frontmatter:

```md
---
title: My Post Title
date: 2026/03/08
description: One-line summary for cards and RSS.
tags:
  - Example
author: Marc Klingen
---
```

Important:

- `title` and `description` should always be present for posts.
- `date` is used for post sorting and RSS `<pubDate>`.
- `author` and `date` are rendered by the wrapper in `mdx-components.jsx`.
- Invalid or missing `date` values can break ordering or RSS output.

### Images

- Prefer storing post images under `public/images/posts/<slug>/...`.
- In MDX, reference them with root-relative paths such as `/images/posts/<slug>/image.png`.

## Implementation Notes

- The repo uses the `@/*` path alias from `tsconfig.json`.
- `normalizePages(getPageMap('/posts'))` is the source of truth for the post list.
- RSS is generated from the same post data, so post frontmatter changes affect both `/posts` and `/rss.xml`.
- `app/feed.xml/route.js` is only a re-export of the RSS handler; keep both routes working.
- Theme and typography come mostly from `nextra-theme-blog`; local customization is intentionally concentrated in `global.css`.
- `instrumentation-client.js` initializes PostHog in the browser. Avoid changing analytics config unless the task is specifically about telemetry.

## Preferred Workflow For Agents

1. Read the file you plan to touch and one adjacent file that consumes it.
2. For content changes, check whether frontmatter affects listing, metadata, or RSS.
3. For UI changes, prefer extending `global.css` or the existing small components before adding new files.
4. Run `pnpm build` after non-trivial changes.

## Change Guidelines

- Preserve the current visual language: warm neutral palette, restrained styling, minimal chrome.
- Do not add large libraries or complex state management for small UI tasks.
- Do not move content out of MDX unless explicitly asked.
- Keep pages statically simple; this site does not need unnecessary client components.
- If adding a new top-level section, update `app/_meta.global.js` if navigation should expose it.

## Quick Checks

Before finishing, verify as relevant:

- `pnpm build` succeeds
- new posts appear on `/posts`
- RSS still builds from `/rss.xml`
- images referenced from MDX resolve from `public/`
- metadata/frontmatter still renders correctly on the page
