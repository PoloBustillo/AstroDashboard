// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

import auth from "auth-astro";

import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: true }),
    icon({
      iconDir: "src/icons",
    }),
    auth(),
    db(),
    react(),
  ],
  output: "server",
  adapter: vercel(),
});
