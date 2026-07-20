# Egzona Abazi

A catalog website for fashion designer Egzona Abazi. Visitors browse
collections and dresses and submit inquiries; there is no checkout or
payment flow, since this is a catalog, not an e-commerce store. A simple
admin dashboard lets the designer's team manage collections' dresses,
including multi-image upload.

## Structure

```
egzona-abazi/
  apps/
    web/   # Next.js 14 (App Router) + TypeScript + Tailwind CSS
    api/   # FastAPI + SQLAlchemy + Alembic, PostgreSQL
  .env.example
  docker-compose.yml   # local Postgres only
```

## Prerequisites

- Node.js 18.18+ and npm
- Python 3.11+
- A PostgreSQL database (either via `docker-compose` locally, or a hosted
  instance such as [Neon](https://neon.tech))
- A [Cloudinary](https://cloudinary.com) account (for dress image uploads)

## 1. Environment variables

Copy the root example file and fill in real values:

```bash
cp .env.example .env
```

`apps/api` reads `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_URL`, and
`CORS_ORIGIN` from its own environment. `apps/web` reads
`NEXT_PUBLIC_API_URL`. The simplest local setup is to copy the relevant
values into an `.env` file inside `apps/api/` and an `.env.local` file
inside `apps/web/`:

```bash
# apps/api/.env
DATABASE_URL=postgresql://egzona:egzona@localhost:5432/egzona_abazi
JWT_SECRET=some-long-random-string
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
CORS_ORIGIN=http://localhost:3000

# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 2. Database (local Postgres via Docker — optional)

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with the credentials already
baked into `.env.example`. If you'd rather point at Neon (or any other
Postgres) locally too, just set `DATABASE_URL` accordingly and skip this
step.

## 3. Run the API (apps/api)

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

# Apply the initial schema
alembic upgrade head

# Create your first admin login (there is no public signup endpoint)
python -m scripts.create_admin

uvicorn app.main:app --reload --port 8000
```

The API is now available at `http://localhost:8000` (interactive docs at
`/docs`).

## 4. Run the web app (apps/web)

```bash
cd apps/web
npm install
npm run dev
```

The site is now available at `http://localhost:3000`. Log in to the admin
dashboard at `http://localhost:3000/admin/login` using the credentials you
created with `create_admin.py`.

## API overview

| Method | Path                      | Auth       | Notes                                   |
| ------ | ------------------------- | ---------- | ---------------------------------------- |
| POST   | `/auth/login`              | —          | Returns a JWT for the admin dashboard    |
| GET    | `/collections`             | —          | Published collections                    |
| GET    | `/collections/{slug}`      | —          | Single published collection              |
| GET    | `/dresses`                 | optional   | Published only unless a valid admin JWT is sent (dashboard uses this to see drafts) |
| GET    | `/dresses/{slug}`          | optional   | Same visibility rule as above            |
| POST   | `/dresses`                 | admin JWT  | Create a dress                           |
| PUT    | `/dresses/{id}`            | admin JWT  | Update a dress                           |
| DELETE | `/dresses/{id}`            | admin JWT  | Delete a dress                           |
| POST   | `/dresses/{id}/images`     | admin JWT  | Upload an image file, stored in Cloudinary |
| POST   | `/inquiries`                | —          | Public contact/inquiry form submission   |

## Hosting

| App          | Target  | Notes                                                                 |
| ------------ | ------- | ---------------------------------------------------------------------- |
| `apps/web`   | Vercel  | Import the repo, set the project root to `apps/web`, and set `NEXT_PUBLIC_API_URL` to your deployed API URL. |
| `apps/api`   | Render  | Deploy as a Web Service with root `apps/api`, build command `pip install -r requirements.txt`, start command `alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT`. Set `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_URL`, and `CORS_ORIGIN` (your Vercel domain) in the Render dashboard. |
| PostgreSQL   | Neon    | Create a Neon project, copy its pooled connection string into `DATABASE_URL` on Render. |

After the first deploy, run `python -m scripts.create_admin` against the
production database once (e.g. via `render exec` or a local connection
using the Neon connection string) to create the admin login.

## Notes

- This is an inquiry-based catalog, not e-commerce — there is intentionally
  no cart, checkout, or payment integration.
- The admin dashboard manages both dresses and collections (table with
  edit/delete, plus add forms) at `/admin/dashboard` and
  `/admin/collections` respectively.
