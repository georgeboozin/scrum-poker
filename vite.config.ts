import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

const pwaConfig = VitePWA({
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: "Scrum Poker",
    short_name: "ScrumPoker",
    description: "Website description(Could be same with index.html file)",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    start_url: "/",
    launch_handler: {
      client_mode: "navigate-existing",
    },
    icons: [
      {
        src: "android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [pwaConfig, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
