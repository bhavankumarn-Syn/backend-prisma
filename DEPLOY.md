# Deploying to Railway

## 1. Push the code to GitHub
This folder isn't a git repo yet. Initialize and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

`.env` is gitignored, so your secrets stay out of the repo.

## 2. Create the Railway project
1. New Project → Deploy from GitHub repo → pick this repo.
2. Add a **Postgres** database (New → Database → Postgres).

## 3. Set environment variables (service → Variables)
| Variable      | Value                                                        |
|---------------|--------------------------------------------------------------|
| `DATABASE_URL`| `${{Postgres.DATABASE_URL}}` (references the Postgres plugin)|
| `JWT_SECRET`  | a long random string                                         |
| `UPLOAD_DIR`  | `/data/uploads` (only if you add a Volume — see step 5)      |

`PORT` is injected by Railway automatically.

## 4. How build & start work
Railway runs `npm install` → `npm run build` → `npm start`.

- `postinstall` / `build` run `prisma generate` (the client is gitignored, so it must be generated on the server).
- `start` runs `prisma migrate deploy` (applies migrations) then boots the app with `tsx`.

No extra config needed — these are already wired into `package.json`.

## 5. Persisting uploads (important)
Railway's filesystem is **ephemeral** — anything written to `./uploads` is wiped on
every deploy/restart. To keep uploaded avatars:

1. Service → add a **Volume**, mount path `/data`.
2. Set `UPLOAD_DIR=/data/uploads`.

The app reads `UPLOAD_DIR` for both storing and serving files, and creates the
directory on boot if it doesn't exist.

## 6. Verify
Once deployed, hit `https://<your-app>.up.railway.app/health` — it should return
`{"status":"ok"}`.
