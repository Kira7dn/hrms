// vite.config.js
import { defineConfig } from "file:///D:/BusinessAnalyze/Letron/erp/apps/hrms/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/BusinessAnalyze/Letron/erp/apps/hrms/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///D:/BusinessAnalyze/Letron/erp/apps/hrms/frontend/node_modules/vite-plugin-pwa/dist/index.js";
import frappeui from "file:///D:/BusinessAnalyze/Letron/erp/apps/hrms/frontend/node_modules/frappe-ui/vite.js";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "D:\\BusinessAnalyze\\Letron\\erp\\apps\\hrms\\frontend";
var FAST_BUILD = !!process.env.HRMS_FAST_BUILD;
var vite_config_default = defineConfig({
  server: {
    port: 8080,
    proxy: getProxyOptions(),
    allowedHosts: true
  },
  plugins: [
    vue(),
    frappeui(),
    ...FAST_BUILD ? [] : [
      VitePWA({
        registerType: "autoUpdate",
        strategies: "injectManifest",
        injectRegister: null,
        devOptions: {
          enabled: true
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
              purpose: "any"
            },
            {
              src: "/assets/hrms/manifest/manifest-icon-192.maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      })
    ]
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    outDir: "../hrms/public/frontend",
    emptyOutDir: true,
    target: "es2015",
    commonjsOptions: {
      include: [/tailwind.config.js/, /node_modules/]
    },
    sourcemap: !FAST_BUILD,
    rollupOptions: {
      output: {
        manualChunks: {
          "frappe-ui": ["frappe-ui"]
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      "frappe-ui > feather-icons",
      "showdown",
      "tailwind.config.js",
      "engine.io-client"
    ]
  }
});
function getProxyOptions() {
  const config = getCommonSiteConfig();
  const webserver_port = config ? config.webserver_port : 8e3;
  if (!config) {
    console.log("No common_site_config.json found, using default port 8000");
  }
  return {
    "^/(app|login|api|assets|files|private)": {
      target: `http://127.0.0.1:${webserver_port}`,
      ws: true,
      router: function(req) {
        const site_name = req.headers.host.split(":")[0];
        console.log(`Proxying ${req.url} to ${site_name}:${webserver_port}`);
        return `http://${site_name}:${webserver_port}`;
      }
    }
  };
}
function getCommonSiteConfig() {
  let currentDir = path.resolve(".");
  while (currentDir !== "/") {
    if (fs.existsSync(path.join(currentDir, "sites")) && fs.existsSync(path.join(currentDir, "apps"))) {
      let configPath = path.join(currentDir, "sites", "common_site_config.json");
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath));
      }
      return null;
    }
    currentDir = path.resolve(currentDir, "..");
  }
  return null;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxCdXNpbmVzc0FuYWx5emVcXFxcTGV0cm9uXFxcXGVycFxcXFxhcHBzXFxcXGhybXNcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEJ1c2luZXNzQW5hbHl6ZVxcXFxMZXRyb25cXFxcZXJwXFxcXGFwcHNcXFxcaHJtc1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQnVzaW5lc3NBbmFseXplL0xldHJvbi9lcnAvYXBwcy9ocm1zL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiXHJcbmltcG9ydCBmcmFwcGV1aSBmcm9tIFwiZnJhcHBlLXVpL3ZpdGVcIlxyXG5cclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgZnMgZnJvbSBcImZzXCJcclxuXHJcbi8vIExldHJvbjogYm8gc291cmNlbWFwIHZhIFBXQSBraGkgY2hpIGNhbiBidWlsZCBuaGFuaCBkZSB4ZW0vdGh1IG5naGllbS5cclxuLy8gRGF0IEhSTVNfRkFTVF9CVUlMRD0xIHRydW9jIGtoaSBjaGF5IGB5YXJuIGJ1aWxkYC4gTWFjIGRpbmggZ2l1IG5ndXllbiBoYW5oIHZpIHVwc3RyZWFtLlxyXG5jb25zdCBGQVNUX0JVSUxEID0gISFwcm9jZXNzLmVudi5IUk1TX0ZBU1RfQlVJTERcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0c2VydmVyOiB7XHJcblx0XHRwb3J0OiA4MDgwLFxyXG5cdFx0cHJveHk6IGdldFByb3h5T3B0aW9ucygpLFxyXG5cdFx0YWxsb3dlZEhvc3RzOiB0cnVlLFxyXG5cdH0sXHJcblx0cGx1Z2luczogW1xyXG5cdFx0dnVlKCksXHJcblx0XHRmcmFwcGV1aSgpLFxyXG5cdFx0Li4uKEZBU1RfQlVJTEQgPyBbXSA6IFtcclxuXHRcdFx0Vml0ZVBXQSh7XHJcblx0XHRcdFx0cmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcclxuXHRcdFx0XHRzdHJhdGVnaWVzOiBcImluamVjdE1hbmlmZXN0XCIsXHJcblx0XHRcdFx0aW5qZWN0UmVnaXN0ZXI6IG51bGwsXHJcblx0XHRcdFx0ZGV2T3B0aW9uczoge1xyXG5cdFx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1hbmlmZXN0OiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuXHRcdFx0XHRcdG5hbWU6IFwiRnJhcHBlIEhSXCIsXHJcblx0XHRcdFx0XHRzaG9ydF9uYW1lOiBcIkZyYXBwZSBIUlwiLFxyXG5cdFx0XHRcdFx0c3RhcnRfdXJsOiBcIi9ocm1zXCIsXHJcblx0XHRcdFx0XHRkZXNjcmlwdGlvbjogXCJFdmVyeWRheSBIUiAmIFBheXJvbGwgb3BlcmF0aW9ucyBhdCB5b3VyIGZpbmdlcnRpcHNcIixcclxuXHRcdFx0XHRcdHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcclxuXHRcdFx0XHRcdGljb25zOiBbXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRzcmM6IFwiL2Fzc2V0cy9ocm1zL21hbmlmZXN0L21hbmlmZXN0LWljb24tMTkyLm1hc2thYmxlLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdHNpemVzOiBcIjE5MngxOTJcIixcclxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdHB1cnBvc2U6IFwiYW55XCIsXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRzcmM6IFwiL2Fzc2V0cy9ocm1zL21hbmlmZXN0L21hbmlmZXN0LWljb24tMTkyLm1hc2thYmxlLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdHNpemVzOiBcIjE5MngxOTJcIixcclxuXHRcdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG5cdFx0XHRcdFx0XHRcdHB1cnBvc2U6IFwibWFza2FibGVcIixcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2hybXMvbWFuaWZlc3QvbWFuaWZlc3QtaWNvbi01MTIubWFza2FibGUucG5nXCIsXHJcblx0XHRcdFx0XHRcdFx0c2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcblx0XHRcdFx0XHRcdFx0cHVycG9zZTogXCJhbnlcIixcclxuXHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2hybXMvbWFuaWZlc3QvbWFuaWZlc3QtaWNvbi01MTIubWFza2FibGUucG5nXCIsXHJcblx0XHRcdFx0XHRcdFx0c2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcblx0XHRcdFx0XHRcdFx0cHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9KVxyXG5cdFx0XSksXHJcblx0XSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczoge1xyXG5cdFx0XHRcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdG91dERpcjogXCIuLi9ocm1zL3B1YmxpYy9mcm9udGVuZFwiLFxyXG5cdFx0ZW1wdHlPdXREaXI6IHRydWUsXHJcblx0XHR0YXJnZXQ6IFwiZXMyMDE1XCIsXHJcblx0XHRjb21tb25qc09wdGlvbnM6IHtcclxuXHRcdFx0aW5jbHVkZTogWy90YWlsd2luZC5jb25maWcuanMvLCAvbm9kZV9tb2R1bGVzL10sXHJcblx0XHR9LFxyXG5cdFx0c291cmNlbWFwOiAhRkFTVF9CVUlMRCxcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0b3V0cHV0OiB7XHJcblx0XHRcdFx0bWFudWFsQ2h1bmtzOiB7XHJcblx0XHRcdFx0XHRcImZyYXBwZS11aVwiOiBbXCJmcmFwcGUtdWlcIl0sXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0fSxcclxuXHRvcHRpbWl6ZURlcHM6IHtcclxuXHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0XCJmcmFwcGUtdWkgPiBmZWF0aGVyLWljb25zXCIsXHJcblx0XHRcdFwic2hvd2Rvd25cIixcclxuXHRcdFx0XCJ0YWlsd2luZC5jb25maWcuanNcIixcclxuXHRcdFx0XCJlbmdpbmUuaW8tY2xpZW50XCIsXHJcblx0XHRdLFxyXG5cdH0sXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBnZXRQcm94eU9wdGlvbnMoKSB7XHJcblx0Y29uc3QgY29uZmlnID0gZ2V0Q29tbW9uU2l0ZUNvbmZpZygpXHJcblx0Y29uc3Qgd2Vic2VydmVyX3BvcnQgPSBjb25maWcgPyBjb25maWcud2Vic2VydmVyX3BvcnQgOiA4MDAwXHJcblx0aWYgKCFjb25maWcpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiTm8gY29tbW9uX3NpdGVfY29uZmlnLmpzb24gZm91bmQsIHVzaW5nIGRlZmF1bHQgcG9ydCA4MDAwXCIpXHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRcIl4vKGFwcHxsb2dpbnxhcGl8YXNzZXRzfGZpbGVzfHByaXZhdGUpXCI6IHtcclxuXHRcdFx0dGFyZ2V0OiBgaHR0cDovLzEyNy4wLjAuMToke3dlYnNlcnZlcl9wb3J0fWAsXHJcblx0XHRcdHdzOiB0cnVlLFxyXG5cdFx0XHRyb3V0ZXI6IGZ1bmN0aW9uIChyZXEpIHtcclxuXHRcdFx0XHRjb25zdCBzaXRlX25hbWUgPSByZXEuaGVhZGVycy5ob3N0LnNwbGl0KFwiOlwiKVswXVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGBQcm94eWluZyAke3JlcS51cmx9IHRvICR7c2l0ZV9uYW1lfToke3dlYnNlcnZlcl9wb3J0fWApXHJcblx0XHRcdFx0cmV0dXJuIGBodHRwOi8vJHtzaXRlX25hbWV9OiR7d2Vic2VydmVyX3BvcnR9YFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvbW1vblNpdGVDb25maWcoKSB7XHJcblx0bGV0IGN1cnJlbnREaXIgPSBwYXRoLnJlc29sdmUoXCIuXCIpXHJcblx0Ly8gdHJhdmVyc2UgdXAgdGlsbCB3ZSBmaW5kIGZyYXBwZS1iZW5jaCB3aXRoIHNpdGVzIGRpcmVjdG9yeVxyXG5cdHdoaWxlIChjdXJyZW50RGlyICE9PSBcIi9cIikge1xyXG5cdFx0aWYgKFxyXG5cdFx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihjdXJyZW50RGlyLCBcInNpdGVzXCIpKSAmJlxyXG5cdFx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihjdXJyZW50RGlyLCBcImFwcHNcIikpXHJcblx0XHQpIHtcclxuXHRcdFx0bGV0IGNvbmZpZ1BhdGggPSBwYXRoLmpvaW4oY3VycmVudERpciwgXCJzaXRlc1wiLCBcImNvbW1vbl9zaXRlX2NvbmZpZy5qc29uXCIpXHJcblx0XHRcdGlmIChmcy5leGlzdHNTeW5jKGNvbmZpZ1BhdGgpKSB7XHJcblx0XHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgpKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0XHRjdXJyZW50RGlyID0gcGF0aC5yZXNvbHZlKGN1cnJlbnREaXIsIFwiLi5cIilcclxuXHR9XHJcblx0cmV0dXJuIG51bGxcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLFNBQVMsb0JBQW9CO0FBQzdXLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxjQUFjO0FBRXJCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFOZixJQUFNLG1DQUFtQztBQVV6QyxJQUFNLGFBQWEsQ0FBQyxDQUFDLFFBQVEsSUFBSTtBQUVqQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPLGdCQUFnQjtBQUFBLElBQ3ZCLGNBQWM7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxHQUFJLGFBQWEsQ0FBQyxJQUFJO0FBQUEsTUFDckIsUUFBUTtBQUFBLFFBQ1AsY0FBYztBQUFBLFFBQ2QsWUFBWTtBQUFBLFFBQ1osZ0JBQWdCO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFVBQ1gsU0FBUztBQUFBLFFBQ1Y7QUFBQSxRQUNBLFVBQVU7QUFBQSxVQUNULFNBQVM7QUFBQSxVQUNULE1BQU07QUFBQSxVQUNOLFlBQVk7QUFBQSxVQUNaLFdBQVc7QUFBQSxVQUNYLGFBQWE7QUFBQSxVQUNiLGFBQWE7QUFBQSxVQUNiLE9BQU87QUFBQSxZQUNOO0FBQUEsY0FDQyxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsWUFDVjtBQUFBLFlBQ0E7QUFBQSxjQUNDLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxjQUNOLFNBQVM7QUFBQSxZQUNWO0FBQUEsWUFDQTtBQUFBLGNBQ0MsS0FBSztBQUFBLGNBQ0wsT0FBTztBQUFBLGNBQ1AsTUFBTTtBQUFBLGNBQ04sU0FBUztBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsY0FDQyxLQUFLO0FBQUEsY0FDTCxPQUFPO0FBQUEsY0FDUCxNQUFNO0FBQUEsY0FDTixTQUFTO0FBQUEsWUFDVjtBQUFBLFVBQ0Q7QUFBQSxRQUNEO0FBQUEsTUFDRCxDQUFDO0FBQUEsSUFDRjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNuQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLGlCQUFpQjtBQUFBLE1BQ2hCLFNBQVMsQ0FBQyxzQkFBc0IsY0FBYztBQUFBLElBQy9DO0FBQUEsSUFDQSxXQUFXLENBQUM7QUFBQSxJQUNaLGVBQWU7QUFBQSxNQUNkLFFBQVE7QUFBQSxRQUNQLGNBQWM7QUFBQSxVQUNiLGFBQWEsQ0FBQyxXQUFXO0FBQUEsUUFDMUI7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDO0FBRUQsU0FBUyxrQkFBa0I7QUFDMUIsUUFBTSxTQUFTLG9CQUFvQjtBQUNuQyxRQUFNLGlCQUFpQixTQUFTLE9BQU8saUJBQWlCO0FBQ3hELE1BQUksQ0FBQyxRQUFRO0FBQ1osWUFBUSxJQUFJLDJEQUEyRDtBQUFBLEVBQ3hFO0FBQ0EsU0FBTztBQUFBLElBQ04sMENBQTBDO0FBQUEsTUFDekMsUUFBUSxvQkFBb0IsY0FBYztBQUFBLE1BQzFDLElBQUk7QUFBQSxNQUNKLFFBQVEsU0FBVSxLQUFLO0FBQ3RCLGNBQU0sWUFBWSxJQUFJLFFBQVEsS0FBSyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQy9DLGdCQUFRLElBQUksWUFBWSxJQUFJLEdBQUcsT0FBTyxTQUFTLElBQUksY0FBYyxFQUFFO0FBQ25FLGVBQU8sVUFBVSxTQUFTLElBQUksY0FBYztBQUFBLE1BQzdDO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRDtBQUVBLFNBQVMsc0JBQXNCO0FBQzlCLE1BQUksYUFBYSxLQUFLLFFBQVEsR0FBRztBQUVqQyxTQUFPLGVBQWUsS0FBSztBQUMxQixRQUNDLEdBQUcsV0FBVyxLQUFLLEtBQUssWUFBWSxPQUFPLENBQUMsS0FDNUMsR0FBRyxXQUFXLEtBQUssS0FBSyxZQUFZLE1BQU0sQ0FBQyxHQUMxQztBQUNELFVBQUksYUFBYSxLQUFLLEtBQUssWUFBWSxTQUFTLHlCQUF5QjtBQUN6RSxVQUFJLEdBQUcsV0FBVyxVQUFVLEdBQUc7QUFDOUIsZUFBTyxLQUFLLE1BQU0sR0FBRyxhQUFhLFVBQVUsQ0FBQztBQUFBLE1BQzlDO0FBQ0EsYUFBTztBQUFBLElBQ1I7QUFDQSxpQkFBYSxLQUFLLFFBQVEsWUFBWSxJQUFJO0FBQUEsRUFDM0M7QUFDQSxTQUFPO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
