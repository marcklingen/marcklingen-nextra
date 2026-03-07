import type { MDXComponents } from "nextra/mdx-components";
import { useMDXComponents as getBlogMDXComponents } from "nextra-theme-blog";

export function useMDXComponents(components?: MDXComponents) {
  return getBlogMDXComponents(components ?? {});
}
