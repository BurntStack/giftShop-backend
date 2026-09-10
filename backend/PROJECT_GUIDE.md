# Project Guide — What Each File Does

A plain-English map of this Django backend. Read top to bottom, or jump to a section.

---

## Root files

| File | What it does |
|---|---|
| `manage.py` | Django's command-line tool. Every command you run (`runserver`, `makemigrations`, `migrate`, `createsuperuser`) goes through this file. You never edit it. |
| `requirements.txt` | The exact list of Python packages this project needs (Django, DRF, JWT auth, CORS, Postgres driver, env-var loader), pinned to specific versions so installs are reproducible. |
| `.env` | Real secret values for **your machine only** — DB password, secret key, etc. Never committed to git (it's in `.gitignore`). |
| `.env.example` | Same variable *names* as `.env` but with placeholder values. Safe to commit — shows teammates what env vars they need to set, without leaking real secrets. |
| `.gitignore` | Tells git which files/folders to never track — `venv/`, `.env`, `__pycache__/`, `db.sqlite3`. |
| `venv/` | The Python virtual environment — an isolated copy of Python + installed packages, just for this project. Never edit or commit it. |

---

## `config/` — the project's control center

This is the "project" package Django generates — it doesn't hold business logic (products, users, etc.), it holds the settings that wire everything else together.

| File | What it does |
|---|---|
| `config/settings.py` | The single most important config file. Defines: which apps are installed, middleware (request/response pipeline), database connection (Postgres via Supabase, read from `.env`), JWT token settings, DRF defaults (auth, permissions, pagination), CORS rules, and `AUTH_USER_MODEL` (tells Django to use our custom `User` model instead of the default one). |
| `config/urls.py` | The top-level URL router. Currently only has `/admin/` wired up. When we build the API, each app's URLs get plugged in here (e.g. `/api/products/`, `/api/auth/`). |
| `config/wsgi.py` | Entry point for traditional web servers (gunicorn, etc.) to run this app in production. Auto-generated, rarely touched. |
| `config/asgi.py` | Same idea as `wsgi.py`, but for async servers (needed if you ever add WebSockets or async views). Auto-generated, rarely touched. |
| `config/__init__.py` | Empty file that marks `config/` as a Python package. Required by Python, does nothing itself. |

---

## The 5 apps

Django organizes code into "apps" — self-contained modules, each owning one slice of the business domain. Every app currently has the same file skeleton:

| File (in every app) | What it does |
|---|---|
| `__init__.py` | Empty — marks the folder as a Python package. |
| `apps.py` | Tiny config class Django uses internally to register the app. Rarely touched. |
| `models.py` | **The most important file per app.** Defines the database tables as Python classes (e.g. `Product`, `Order`). Each class = one table, each attribute = one column. |
| `admin.py` | Registers models so they show up in the `/admin/` dashboard, and customizes how they display there. |
| `views.py` | **Currently empty in every app.** This is where API logic will go — e.g. "return a list of products," "add item to cart." Not built yet. |
| `tests.py` | Where automated tests for that app go. Currently just the default empty stub — no tests written yet. |
| `migrations/` | Auto-generated files that track every change ever made to `models.py`, so Django can create/update the actual database tables to match. You don't hand-write these — `makemigrations` generates them, `migrate` applies them. |

### `users/` — accounts & addresses
- `models.py`: `User` (extends Django's built-in user with `email` login, `phone_number`, `role` of customer/admin) and `Address` (shipping addresses, linked to a user).
- `admin.py`: registers both models; extends Django's built-in `UserAdmin` so `phone_number` and `role` are editable in the admin's user edit form.

### `authentication/` — currently a placeholder
- All files still at Django's default scaffold — no models or views written yet. This app is meant to hold login/register/token logic, but that logic hasn't been built (it may end up using `users/` + `djangorestframework-simplejwt` instead of custom models here — worth deciding before writing code).

### `products/` — catalog
- `models.py`: `Category` (supports nested categories via `parent`), `Product` (price, stock, SKU, belongs to a category), `ProductImage` (one or more images per product).

### `cart/` — shopping cart
- `models.py`: `Cart` (one per user), `CartItem` (a product + quantity inside a cart; can't have duplicate product rows in the same cart, quantity must be ≥ 1).

### `orders/` — checkout & order history
- `models.py`: `Order` (snapshot of a purchase — user, address, status, total), `OrderItem` (each product line in an order, with `price_at_purchase` frozen at checkout time so it doesn't change if the product's price changes later).

---

## What's built vs. not built yet

✅ Done: all database models, admin panel access, DB connection to Supabase, JWT/CORS/DRF settings.
❌ Not done: any actual API endpoints (`views.py` is empty everywhere), `config/urls.py` only routes to `/admin/`, no serializers exist, `authentication/` app has no logic yet.

So right now you can **see and manipulate data only through `/admin/`** — there's no way for a frontend app to talk to this backend yet. That's the next phase of work.
