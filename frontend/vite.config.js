import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { VitePWA } from "vite-plugin-pwa"
import frappeui from "frappe-ui/vite"

import path from "path"
import fs from "fs"

// Letron: bo sourcemap va PWA khi chi can build nhanh de xem/thu nghiem.
// Dat HRMS_FAST_BUILD=1 truoc khi chay `yarn build`. Mac dinh giu nguyen hanh vi upstream.
const FAST_BUILD = !!process.env.HRMS_FAST_BUILD
// Letron: cho phep doi cong dev de khong dung cong backend.
const DEV_PORT = Number(process.env.HRMS_DEV_PORT || 8080)

export default defineConfig({
	server: {
		port: DEV_PORT,
		proxy: getProxyOptions(),
		allowedHosts: true,
	},
	plugins: [
		vue(),
		frappeui({ port: DEV_PORT }),
		...(FAST_BUILD ? [] : [
			VitePWA({
				registerType: "autoUpdate",
				strategies: "injectManifest",
				injectRegister: null,
				devOptions: {
					enabled: true,
				},
				manifest: {
					display: "standalone",
					name: "Frappe HR",
					short_name: "Frappe HR",
					start_url: "/hrms",
					description: "Everyday HR & Payroll operations at your fingertips",
					theme_color: "#ffffff",
					icons: [
						{
							src: "/assets/hrms/manifest/manifest-icon-192.maskable.png",
							sizes: "192x192",
							type: "image/png",
							purpose: "any",
						},
						{
							src: "/assets/hrms/manifest/manifest-icon-192.maskable.png",
							sizes: "192x192",
							type: "image/png",
							purpose: "maskable",
						},
						{
							src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "any",
						},
						{
							src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
							sizes: "512x512",
							type: "image/png",
							purpose: "maskable",
						},
					],
				},
			})
		]),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "../hrms/public/frontend",
		emptyOutDir: true,
		target: "es2015",
		commonjsOptions: {
			include: [/tailwind.config.js/, /node_modules/],
		},
		sourcemap: !FAST_BUILD,
		rollupOptions: {
			output: {
				manualChunks: {
					"frappe-ui": ["frappe-ui"],
				},
			},
		},
	},
	optimizeDeps: {
		include: [
			"frappe-ui > feather-icons",
			"showdown",
			"tailwind.config.js",
			"engine.io-client",
		],
	},
})

function getProxyOptions() {
	const config = getCommonSiteConfig()
	const webserver_port = config ? config.webserver_port : 8000
	if (!config) {
		console.log("No common_site_config.json found, using default port 8000")
	}
	return {
		"^/(app|login|api|assets|files|private)": {
			target: `http://127.0.0.1:${webserver_port}`,
			ws: true,
			router: function (req) {
				const site_name = req.headers.host.split(":")[0]
				console.log(`Proxying ${req.url} to ${site_name}:${webserver_port}`)
				return `http://${site_name}:${webserver_port}`
			},
		},
	}
}

function getCommonSiteConfig() {
	let currentDir = path.resolve(".")
	// traverse up till we find frappe-bench with sites directory
	while (currentDir !== "/") {
		if (
			fs.existsSync(path.join(currentDir, "sites")) &&
			fs.existsSync(path.join(currentDir, "apps"))
		) {
			let configPath = path.join(currentDir, "sites", "common_site_config.json")
			if (fs.existsSync(configPath)) {
				return JSON.parse(fs.readFileSync(configPath))
			}
			return null
		}
		currentDir = path.resolve(currentDir, "..")
	}
	return null
}
