# Personal Portfolio

A modern single-page portfolio built with React, Vite, Tailwind CSS, GSAP, and EmailJS.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Environment variables

Create a local `.env` file using `.env.example` and add your EmailJS values:

```bash
VITE_EMAILJS_SERVICE_ID=service_pnnfz7h
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_SITE_URL=https://your-vercel-domain.vercel.app
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo into Vercel.
3. In Vercel Project Settings > Environment Variables, add:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_SITE_URL`
4. Set `VITE_SITE_URL` to your final deployed domain, for example `https://your-project.vercel.app`.
5. Deploy.

## SEO and launch files

- `public/site.webmanifest`
- `public/og-image.svg`
- `robots.txt` and `sitemap.xml` are generated automatically at build time from `VITE_SITE_URL`

## Customize content

- Update personal details, resume path, skills, and social links in `src/data/siteConfig.js`
- Update project cards in `src/data/projects.js`
- Replace `public/resume.pdf` with your actual resume file
