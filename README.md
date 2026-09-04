# Prompty

Prompt lab for image and video AI generation prompts.

Client-side prompt assembly only. Does not call image or video generation APIs. No auth.

## Supported targets

- Image: Midjourney, Flux, DALL-E, Stable Diffusion
- Video: Runway, Kling, Luma, Sora-style

## Features

- Image / Video mode toggle
- Subject, style presets (+ custom), camera / lighting / composition (image)
- Motion / camera move / duration (video)
- Aspect ratio + quality tags + optional negative prompt
- Short and detailed prompt outputs with one-click copy
- Starter templates (product shot, cinematic portrait, product demo video, and more)
- Recent prompts persisted in browser storage
- Dark, mobile-friendly UI (Next.js App Router, TypeScript, Tailwind CSS)

## Local development

Install dependencies, then start the development server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

Other scripts: npm run build, npm start, npm run lint

## Deploy to Vercel

1. Push this repo to GitHub (see Push section below).
2. Open the Vercel new-project page and import the repository.
3. Framework preset: Next.js (auto-detected).
4. Leave build settings as defaults.
5. Click Deploy.

You can also use the Vercel CLI.

## Push to GitHub

Target remote: https://github.com/raja-projects/prompty-grok

From the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Prompty prompt lab"
git branch -M main
git remote add origin https://github.com/raja-projects/prompty-grok.git
git push -u origin main
```

Create the empty GitHub repo first if needed.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Pure TypeScript prompt builder (no backend)

## License

MIT
