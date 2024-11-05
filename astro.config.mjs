// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

import icon from "astro-icon";

import auth from "auth-astro";

import db from "@astrojs/db";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon({
    iconDir: "src/icons",
  }), auth(), db()],
  output: "server",
  adapter: vercel(),
});