import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Preloads the fonts used above the fold so headings render in their final
 * typeface on first paint instead of swapping in late.
 */
function preloadFonts(pattern: RegExp): Plugin {
  let base = '/'
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, context) {
        return Object.keys(context.bundle ?? {})
          .filter((file) => pattern.test(file))
          .map<HtmlTagDescriptor>((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: base + file, crossorigin: '' },
            injectTo: 'head',
          }))
      },
    },
  }
}

/**
 * Makes `vite preview` cache content-hashed files the way a production host
 * should (`immutable`), so repeat visits are served straight from cache.
 */
function cacheHashedAssets(): Plugin {
  return {
    name: 'cache-hashed-assets',
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.url?.startsWith('/assets/')) {
          response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    preloadFonts(/(cinzel-latin-wght-normal|inter-latin-wght-normal|cormorant-garamond-latin-500-italic)-.*\.woff2$/),
    cacheHashedAssets(),
  ],
})
