Recommended deployment options for the backend

Option A — Render (recommended)
- Create a new Web Service on Render and connect your GitHub repo `project_backend`.
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Add environment variables (Render dashboard > Environment > Add): `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.
- Deploy. Render will run `npm install` and start the app; root and `/api/*` will be available.

Option B — Vercel (serverless)
- This repository now includes a serverless wrapper so the Express app can run on Vercel as Serverless Functions:
  - `serverless-http` is added to `package.json`.
  - `api/index.js` wraps the Express app and exposes it as serverless functions.

Notes for Vercel deployment:
- Connect the `project_backend` GitHub repo to Vercel and deploy the project.
- In Vercel Project Settings → Environment Variables, add `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.
- Vercel serverless functions have execution time limits — avoid long-running DB operations in a single request.
- After deployment, verify by visiting `/api/status`. The root `/` will return a JSON message.

Quick check
- After deployment, visit `/api/status` to verify the app is running.
- If you see `Cannot GET /`, the server isn't responding at root — try `/api/status` or redeploy on a platform that supports Node web services (Render, Railway, Heroku).
