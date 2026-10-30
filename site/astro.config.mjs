// @ts-check
import { defineConfig } from 'astro/config';

// Vercel exposes the production domain at build time; used for canonical URLs.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// https://astro.build/config
export default defineConfig({
	site: productionHost ? `https://${productionHost}` : undefined,
});
