Recommended deployment options for the backend

Option A — Render (recommended)
- Create a new Web Service on Render and connect your GitHub repo `project_backend`.
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables (Render dashboard > Environment > Add): `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.
- Deploy. Render will run `npm install` and start the app; root and `/api/*` will be available.

Option B — Vercel (serverless)
- Vercel is optimized for static sites and serverless functions. To run this Express app on Vercel you must either:
  1. Convert Express routes into Vercel Serverless Functions under the `api/` folder, or
  2. Containerize the app (use Vercel's Docker support) — not recommended.
- If you keep using Vercel, add a simple GET `/` route (already added) and ensure Vercel's build runs `npm install` and `npm start` via a custom server configuration. Note: long-running servers may be incompatible with Vercel's serverless model.

Quick check
- After deployment, visit `/api/status` to verify the app is running.
- If you see `Cannot GET /`, the server isn't responding at root — try `/api/status` or redeploy on a platform that supports Node web services (Render, Railway, Heroku).
