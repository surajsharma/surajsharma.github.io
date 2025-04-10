import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
// import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: "https://evenzero.in/",
  output: "static",
  adapter: node({
    mode: 'standalone',
  }),
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true
    }
  },
  integrations: [ mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), prefetch(), react()],
  compressHTML: true,
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    },
    server: {
      allowedHosts: ['shell-ideas-illinois-johnny.trycloudflare.com']
    }
  }
});