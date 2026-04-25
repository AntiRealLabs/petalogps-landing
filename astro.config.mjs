import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://petalogps.com",
  output: "static",
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
