// Set PUBLIC_DOCS_URL in the Vercel project for the site once the docs are deployed.
export const DOCS_URL = (import.meta.env.PUBLIC_DOCS_URL ?? 'https://hostelhive-docs.vercel.app').replace(/\/$/, '');
export const GITHUB_ORG = 'https://github.com/Hostel-Hive';

export const repos = [
	{ name: 'hostelhive-backend', stack: 'Go, PostgreSQL, Firebase', summary: 'REST API, auth, attendance, passes, complaints and reports.' },
	{ name: 'hostelhive-frontend', stack: 'React, TypeScript, Vite', summary: 'Staff dashboard and student web portal.' },
	{ name: 'hostelhive-mobileapp', stack: 'Flutter, Dart', summary: 'Student app for passes, QR, complaints and inbox.' },
	{ name: 'hostelhive-hardware', stack: 'ESP32', summary: 'Firmware for the ESP32 QR gate scanners.' },
];
