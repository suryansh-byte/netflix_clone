# Netflix Clone

This repository is a simple static website project — a Netflix-style landing/cloning exercise built with HTML and CSS.

## What this is

- A static front-end clone of a Netflix-like interface (layout, hero, basic navigation and styles).
- Intended as a learning / portfolio project. No backend or authentication is included.

## Files

- `index.html` — Main landing page
- `browse.html` — Browse or content listing (placeholder)
- `signin.html` — Sign-in form page (static)
- `faq.html` — Frequently asked questions page
- `style.css` — Global stylesheet

## How to run

1. Clone or download the repository.
2. Open `index.html` in your browser (double-click or right-click -> Open with).

Alternatively, serve the folder with a static server for nicer behavior (recommended if you use modules or fetch):

```
# using Python 3 in the project folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Notes

- This is a purely static project. All links and forms are placeholders unless you add backend logic.
- Feel free to add more assets (images, scripts) and update the README with credits and license.

## License

This project is provided as-is for learning. Add a license file if you want to specify reuse terms (e.g., `LICENSE` with MIT).

---

Repository: https://github.com/suryansh-byte/netflix_clone

## Server-side verification (Google Authentication)

This project includes a minimal server scaffold in `server/` that verifies Google ID tokens server-side. The client (`signin.html`) will POST the ID token to the server at `/api/auth/google` and the server verifies it with Google's tokeninfo endpoint.

Notes:
- You must run the server somewhere reachable from the site (e.g., `http://localhost:3000` for local testing). When the site is hosted on GitHub Pages you'll need a separate hosted backend (Vercel, Render, Heroku, etc.) because GitHub Pages can't run server-side code.
- The server expects an environment variable `GOOGLE_CLIENT_ID` (optional but recommended) to verify the token audience.

Quick start (local):

1. Install dependencies:

```powershell
cd server
npm install
```

2. Start the server locally:

```powershell
# set the client ID if you have one
$env:GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; npm start
```

3. In `signin.html` replace the placeholder `GOOGLE_CLIENT_ID` client-side constant with the same client ID you created in Google Cloud Console. Serve the front-end using a static server (e.g. `python -m http.server 8000`) and visit `http://localhost:8000/signin.html`.

4. When you sign in with Google, the client will POST the ID token to `http://localhost:3000/api/auth/google` and the server will verify it and return the token payload.

Security reminder:
- The example server uses Google's `tokeninfo` endpoint for simplicity. In production you should use a proper verified flow, set secure cookies or session tokens, enable HTTPS, and apply additional checks (expiry, nonce/state, user record creation).

