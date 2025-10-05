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
    // Plugin to defer CSS loading using preload + media print trick
    {
      name: 'defer-css',
      enforce: 'post' as const,
      transformIndexHtml(html: string) {
        // Transform CSS links to use preload + media="print" trick
        // <link rel="stylesheet" href="X"> becomes:
        // <link rel="preload" href="X" as="style">
        // <link rel="stylesheet" href="X" media="print" onload="this.media='all'">
        // <noscript><link rel="stylesheet" href="X"></noscript>
        return html.replace(
          /<link([^>]*?)rel="stylesheet"([^>]*?)href="([^"]+)"([^>]*?)>/gi,
          (match, before, middle, href, after) => {
            // Skip if already has media="print" or is not a CSS file
            if (match.includes('media="print"') || !href.includes('.css')) {
              return match;
            }
            return `<link${before}rel="preload"${middle}href="${href}"${after} as="style">\n` +
                   `<link${before}rel="stylesheet"${middle}href="${href}"${after} media="print" onload="this.media='all'">\n` +
                   `<noscript><link${before}rel="stylesheet"${middle}href="${href}"${after}></noscript>`;
          }
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
