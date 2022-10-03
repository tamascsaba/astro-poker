import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import analogjsangular from "@analogjs/astro-angular";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [react(), tailwind({config: { applyBaseStyles: false }}), svelte(), analogjsangular()],
  vite: {
    ssr: {
      noExternal: ["@fontsource/outfit"]
    }
  }
});