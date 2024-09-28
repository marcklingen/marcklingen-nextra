import "../global.css";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // Initialize PostHog
    if (typeof window !== "undefined") {
      posthog.init("phc_vATvKWkPfAsflKInhPMJL5PZMbd2lkurYuxMKqDNd4t", {
        api_host: "https://ph.m9n.dev",
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
        capture_pageview: true, // Disable automatic pageview capture, as we capture manually
      });
    }
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  );
}
