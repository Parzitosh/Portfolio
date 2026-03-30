import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function seoFilesPlugin(siteUrl) {
  return {
    name: 'seo-files-plugin',
    closeBundle() {
      const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
      const distDir = path.resolve('dist')

      fs.writeFileSync(
        path.join(distDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${normalizedSiteUrl}/sitemap.xml\n`,
      )

      fs.writeFileSync(
        path.join(distDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${normalizedSiteUrl}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://your-vercel-domain.vercel.app'

  return {
    plugins: [react(), seoFilesPlugin(siteUrl)],
  }
})
