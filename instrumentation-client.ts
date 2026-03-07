import posthog from "posthog-js";

if (typeof window !== "undefined") {
  posthog.init("phc_vATvKWkPfAsflKInhPMJL5PZMbd2lkurYuxMKqDNd4t", {
    api_host: "https://ph.m9n.dev",
    defaults: "2026-01-30",
  });
}
