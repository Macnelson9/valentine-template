# 4 Months + Valentine Microsite

Single‑page romantic microsite built with React + Vite. It features a bento‑grid slideshow background, a timed 4‑month message sequence, a Valentine prompt with playful “No” messages, a relationship receipt, and “Open When…” envelopes. Every interaction emits floating hearts.

## Features
- Bento grid slideshow of images/videos (crossfading tiles)
- 4‑month message sequence with “Keep going” CTA
- Valentine modal with looping “No” responses
- Success screen with routes to extra experiences
- Relationship Receipt screen
- Open When… envelopes with sweet notes
- Floating heart particles on every click/tap

## Tech
- React + Vite
- Framer Motion
- Plain CSS (no Tailwind)

## Add your media
Media is read from `src/assets` (imported in `src/App.jsx`).

- Add your photos/videos to `src/assets`.
- Update the `MEDIA` array in `src/App.jsx` to point at those imports.
- Example image/video sizes:
  - Images: 1600–2400px on the long edge, JPG/WEBP 250–500KB.
  - Videos: 6–12 seconds, H.264 MP4, 720p–1080p, 2–6MB.

## Run locally
```bash
npm install
npm run dev
```

## Customize
- Main flow/state machine: `src/App.jsx`
- Slideshow: `src/components/BentoSlideshow.jsx`
- Valentine modal: `src/components/ValentineModal.jsx`
- Receipt: `src/components/ReceiptScreen.jsx`
- Open When…: `src/components/OpenWhenScreen.jsx`
- Global styling: `src/index.css`

## Valentine microsite

### Add your media
- Put your photos and videos in `public/assets`.
- Update the `MEDIA` array in `src/App.jsx` with your file names.
- Example paths: `/assets/1.jpg`, `/assets/2.mp4`.

Recommended sizes
- Images: 1600–2400px on the long edge, JPG/WEBP around 250–500KB.
- Videos: 6–12 seconds, H.264 MP4, 720p–1080p, 2–6MB.
- Keep filenames short and avoid spaces.

### Run locally
- `npm install`
- `npm run dev`
