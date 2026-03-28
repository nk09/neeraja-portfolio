# /public folder — static files served at root URL

Place these two files here before deploying:

1. **resume.pdf** — your CV/resume
   - The nav "Resume ↗" button links to /resume.pdf
   - Without this file the button opens a 404

2. **profile.jpg** (or .png) — your profile photo
   - The hero section uses /profile.jpg
   - Recommended: square crop, min 400×400px, face centered
   - If missing, the hero shows your initials "NK" as a fallback automatically
   - If you use .png instead, update the src in app/page.tsx: src="/profile.png"

Both files go directly in this folder (not in a subfolder).
Vercel serves everything in /public at the root path automatically.
