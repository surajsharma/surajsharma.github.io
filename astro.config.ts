import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import { webcore } from "webcoreui/integration";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: "https://evenzero.in/",
  output: "static",
  adapter: import.meta.env.PROD ? cloudflare() : undefined,
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  integrations: [mdx({}), tailwind({}), sitemap(), react(), webcore()],
  compressHTML: true,
  vite: {
    ssr: {
      external: ["fs", "path", "child_process", "@resvg/resvg-js"],
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: {
        "@resvg/resvg-js": "@resvg/resvg-js/wasm", // force WASM
      },
    },
    server: {
      allowedHosts: [".trycloudflare.com"],
    },
  },
});
