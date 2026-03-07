"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PostHogReactProvider } from "posthog-js/react";

function PostHogPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    posthog.capture("$pageview", {
      $current_url: window.location.href,
    });
  }, [pathname]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current || typeof window === "undefined") {
      return;
    }

    posthog.init("phc_vATvKWkPfAsflKInhPMJL5PZMbd2lkurYuxMKqDNd4t", {
      api_host: "https://ph.m9n.dev",
      capture_pageview: false,
      loaded: (client) => {
        if (process.env.NODE_ENV === "development") {
          client.debug();
        }
      },
    });

    hasInitialized.current = true;
  }, []);

  return (
    <PostHogReactProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PostHogReactProvider>
  );
}
