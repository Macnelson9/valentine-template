# Valentine Microsite Template

Single‑page romantic microsite template built with React + Vite. It features a bento‑grid slideshow background, a timed message sequence, a Valentine prompt with playful “No” messages, a relationship receipt, and “Open When…” envelopes. Every interaction emits floating hearts.

## Features
- Bento grid slideshow of images/videos (crossfading tiles)
- Timed message sequence with “Keep going” CTA
- Valentine modal with looping “No” responses
- Success screen with routes to extra experiences
- Relationship Receipt screen
- Open When… envelopes with sweet notes
- Floating heart particles on every click/tap

## Tech
- React + Vite
- Framer Motion
- Plain CSS (no Tailwind)

## Customize
All personalization lives in `src/config.js`.

### Add your media
Media is loaded from `/public/assets` via `SITE_CONFIG.media`.

- Replace the placeholder files in `public/assets` with your own photos/videos.
- Update `SITE_CONFIG.media` in `src/config.js` with your new file names.
- Example paths: `/assets/1.jpg`, `/assets/2.mp4`.

Recommended sizes:
- Images: 1600–2400px on the long edge, JPG/WEBP 250–500KB.
- Videos: 6–12 seconds, H.264 MP4, 720p–1080p, 2–6MB.

## Run locally
```bash
npm install
npm run dev
```

## Template usage
1) Click **Use this template** on GitHub.
2) Clone your new repo.
3) Update `src/config.js` and replace files in `public/assets`.
4) Deploy (Vercel/Netlify) or run locally.
5) Keep this repo public; keep your personal version in a separate private repo if needed.

### Update copy, theme, and timing
- Text, labels, and notes: `COPY` in `src/config.js`
- Colors & fonts: `SITE_CONFIG.theme` in `src/config.js`
- Slideshow timing: `SITE_CONFIG.animation` in `src/config.js`
- Heart particles: `SITE_CONFIG.hearts` in `src/config.js`
- Bento layout: `SITE_CONFIG.bento` in `src/config.js`

## Code map
- Main flow/state machine: `src/App.jsx`
- Slideshow: `src/components/BentoSlideshow.jsx`
- Valentine modal: `src/components/ValentineModal.jsx`
- Receipt: `src/components/ReceiptScreen.jsx`
- Open When…: `src/components/OpenWhenScreen.jsx`
- Global styling: `src/index.css`
