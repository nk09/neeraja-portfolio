# /public folder — static files served at root URL

Place this file here before deploying:

1. **profile.jpg** (or .png) — your profile photo
   - The hero section uses /profile.jpg
   - Recommended: square crop, min 400x400px, face centered
   - If missing, the hero shows your initials "NK" as a fallback automatically
   - If you use .png instead, update the src in app/page.tsx: src="/profile.png"

This file goes directly in this folder (not in a subfolder).
Vercel serves everything in /public at the root path automatically.

**Note:** Resume/CV is NOT served publicly. Recruiters are directed to LinkedIn.
