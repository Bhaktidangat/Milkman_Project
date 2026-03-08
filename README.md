# Milkman Project

## What This Project Includes
- Backend: Django REST API in [backend](file:///c:/milkman/backend)
- Frontend: React (Vite) app in [frontend](file:///c:/milkman/frontend)
- Database: SQLite (auto-created in backend)
- Dev Proxy: Frontend talks to backend via `/api` using Vite proxy

## Prerequisites
- Python 3.14 installed and available on PATH
- Node.js (LTS) and npm

## Quick Start (Recommended)
1. Double-click [start-dev.bat](file:///c:/milkman/start-dev.bat)
2. The script will:
   - Use the Python virtual environment at [backend/venv](file:///c:/milkman/backend/venv)
   - Install backend dependencies from [requirements.txt](file:///c:/milkman/backend/requirements.txt)
   - Apply Django migrations
   - Start the backend at http://127.0.0.1:8000/
   - Start the frontend dev server (Vite) and open it in the browser

## Manual Start (If you prefer terminals)
1. Backend
   - Open a terminal
   - Change directory: `cd C:\milkman\backend`
   - Activate venv: `.\venv\Scripts\activate`
   - Install deps: `pip install -r requirements.txt`
   - Apply migrations: `python manage.py migrate`
   - Run server: `python manage.py runserver 127.0.0.1:8000`
2. Frontend
   - Open another terminal
   - Change directory: `cd C:\milkman\frontend`
   - Install deps: `npm install`
   - Start dev: `npm run dev`

## Environment
- Frontend reads backend port from [.env.development](file:///c:/milkman/frontend/.env.development)
- Current setting: `VITE_API_PORT=8000`
- Vite proxy in [vite.config.js](file:///c:/milkman/frontend/vite.config.js) targets `http://127.0.0.1:${VITE_API_PORT}`

## Key Features (Simple Overview)
- Accounts and JWT auth: API endpoints secured with bearer token
- Products: Categories, listing, and images via the products app
- Orders & Cart: Basic ordering flow on the frontend
- Subscriptions: Simple subscription pages and API

## Seeding Sample Data
- Run: `python manage.py seed_milkman_products`
- Command location: [seed_milkman_products.py](file:///c:/milkman/backend/apps/products/management/commands/seed_milkman_products.py)

## Common Troubleshooting
- Port in use: If `8000` is busy, stop other servers or change `VITE_API_PORT` and runserver port consistently
- Missing packages: Ensure the venv is activated before installing or running the backend

## Project Structure (Short)
- Backend apps: [accounts](file:///c:/milkman/backend/apps/accounts), [products](file:///c:/milkman/backend/apps/products), [orders](file:///c:/milkman/backend/apps/orders), [subscriptions](file:///c:/milkman/backend/apps/subscriptions)
- Frontend pages: [Home](file:///c:/milkman/frontend/src/pages/Home.jsx), [Products](file:///c:/milkman/frontend/src/pages/Products.jsx), [Cart](file:///c:/milkman/frontend/src/pages/Cart.jsx), [Checkout](file:///c:/milkman/frontend/src/pages/Checkout.jsx), [Login](file:///c:/milkman/frontend/src/pages/Login.jsx), [Register](file:///c:/milkman/frontend/src/pages/Register.jsx), [Subscriptions](file:///c:/milkman/frontend/src/pages/Subscriptions.jsx)

