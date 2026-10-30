// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Set PUBLIC_SITE_URL in the Vercel project for the docs once the landing page is deployed.
const siteUrl = (process.env.PUBLIC_SITE_URL ?? 'https://hostelhive.vercel.app').replace(/\/$/, '');

// Vercel exposes the production domain at build time; used for the sitemap and canonical URLs.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// https://astro.build/config
export default defineConfig({
	site: productionHost ? `https://${productionHost}` : undefined,
	integrations: [
		starlight({
			title: 'HostelHive',
			description: 'Set up, configure, deploy and use HostelHive, the open-source hostel management system.',
			logo: { src: './src/assets/logo.svg', replacesTitle: false },
			favicon: '/favicon.svg',
			customCss: ['@fontsource-variable/plus-jakarta-sans', '@fontsource-variable/jetbrains-mono', './src/styles/theme.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Hostel-Hive' },
				{ icon: 'external', label: 'HostelHive website', href: siteUrl },
			],
			expressiveCode: {
				themes: ['github-dark-default', 'github-light-default'],
				styleOverrides: {
					borderRadius: '6px',
					borderColor: 'var(--sl-color-hairline)',
					frames: { frameBoxShadowCssValue: 'none' },
				},
			},
			editLink: { baseUrl: 'https://github.com/Hostel-Hive/hostelhive-site/edit/main/docs/' },
			lastUpdated: true,
			sidebar: [
				{
					label: 'Getting started',
					items: [
						{ label: 'What HostelHive is', slug: 'getting-started/introduction' },
						{ label: 'Architecture', slug: 'getting-started/architecture' },
						{ label: 'Quick start', slug: 'getting-started/quick-start' },
					],
				},
				{
					label: 'Backend',
					items: [
						{ label: 'Local setup', slug: 'backend/setup' },
						{ label: 'Configuration', slug: 'backend/configuration' },
						{ label: 'Database migrations', slug: 'backend/migrations' },
						{ label: 'First administrator', slug: 'backend/first-admin' },
						{ label: 'API reference', slug: 'backend/api-reference' },
						{ label: 'Deployment', slug: 'backend/deployment' },
					],
				},
				{
					label: 'Web dashboard',
					items: [
						{ label: 'Local setup', slug: 'web/setup' },
						{ label: 'Deploying', slug: 'web/deployment' },
					],
				},
				{
					label: 'Mobile app',
					items: [{ label: 'Setup and builds', slug: 'mobile/setup' }],
				},
				{
					label: 'Gate scanners',
					items: [
						{ label: 'How the gates work', slug: 'hardware/overview' },
						{ label: 'Wiring and parts', slug: 'hardware/wiring' },
						{ label: 'Configure and flash', slug: 'hardware/setup' },
					],
				},
				{
					label: 'Using HostelHive',
					items: [
						{ label: 'Roles and permissions', slug: 'guides/roles' },
						{ label: 'Adding students', slug: 'guides/onboarding' },
						{ label: 'Attendance', slug: 'guides/attendance' },
						{ label: 'Movement policy', slug: 'guides/movement-policy' },
						{ label: 'Complaints', slug: 'guides/complaints' },
						{ label: 'Notices and alerts', slug: 'guides/announcements' },
						{ label: 'Reports', slug: 'guides/reports' },
					],
				},
				{ label: 'Contributing', slug: 'contributing' },
			],
		}),
	],
});
