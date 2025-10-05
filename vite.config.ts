import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // Custom plugin to defer CSS loading
    {
      name: 'defer-css',
      enforce: 'post' as const,
      transformIndexHtml(html: string) {
        // Transform CSS links to use preload with onload handler for async loading
        return html.replace(
          /<link([^>]*?)rel="stylesheet"([^>]*?)>/gi,
          '<link$1rel="preload"$2 as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
        ).replace(
          /<link([^>]*?)rel="preload"([^>]*?)as="style"/gi,
          '<link$1rel="preload"$2as="style"'
        );
      }
    } as Plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
