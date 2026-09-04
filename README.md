# 1Fi EMI Shopping App

A full-stack web application that displays smartphones with multiple EMI plans backed by mutual funds. Users can browse products, switch between variants (storage/color), pick an EMI plan, and proceed to a checkout summary — similar to Snapmint's product experience.

**Live Demo:** `<your-vercel-url-here>`
**Backend API:** `<your-render-url-here>`
**Video Walkthrough:** `<your-drive-or-youtube-link-here>`

---

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React (Vite), React Router, Tailwind CSS, Axios |
| Backend    | Node.js, Express                    |
| Database   | PostgreSQL, Sequelize (ORM)         |
| Deployment | Vercel (frontend), Render (backend + Postgres) |

---

## Project Structure

```
1fi-emi-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # Sequelize + Postgres connection
│   │   ├── models/                # Product, Variant, EmiPlan schemas + associations
│   │   ├── routes/products.js     # /api/products endpoints
│   │   ├── seed/seed.js           # Seed script with sample data
│   │   └── app.js                 # Express app setup
│   ├── server.js                  # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/productApi.js      # Axios calls to backend
│   │   ├── components/            # Navbar, Footer, ProductCard, VariantSelector, EMIPlanList
│   │   ├── pages/                 # Home, ProductPage, CheckoutPage
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed locally (or a hosted instance)

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/1fi-emi-app.git
cd 1fi-emi-app
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
DB_NAME=fi_emi_app
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=5432
```

Create the database (if it doesn't exist):
```bash
psql -U postgres -c "CREATE DATABASE fi_emi_app;"
```

Seed the database with sample products:
```bash
npm run seed
```

Start the backend server:
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## API Endpoints

### `GET /api/products`
Returns all products with their variants and EMI plans.

**Example response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "description": "The most advanced iPhone yet...",
    "specs": {
      "Front Camera": "18MP",
      "Rear Camera": "48MP + 48MP + 48MP",
      "Screen Size": "6.3 inch",
      "Battery": "Up to 33 hours video playback",
      "Processor": "A19 Pro chip"
    },
    "variants": [
      {
        "id": 1,
        "variantSlug": "256gb-orange",
        "storage": "256GB",
        "color": "Orange",
        "mrp": "134900.00",
        "price": "127400.00",
        "image": "https://placehold.co/400x400/f97316/ffffff?text=iPhone+17+Pro",
        "emiPlans": [
          {
            "id": 1,
            "tenureMonths": 3,
            "monthlyAmount": "44967.00",
            "interestRate": "0.00",
            "cashback": "7500.00"
          }
        ]
      }
    ]
  }
]
```

### `GET /api/products/:slug`
Returns a single product (with variants and EMI plans) by its unique slug.

**Example:** `GET /api/products/iphone-17-pro`

Returns the same shape as one object above, or `404` with `{ "error": "Product not found" }` if the slug doesn't exist.

---

## Database Schema

**products**
| Column      | Type      | Notes                |
|-------------|-----------|-----------------------|
| id          | INTEGER   | Primary key, auto-increment |
| name        | STRING    | e.g. "iPhone 17 Pro" |
| slug        | STRING    | Unique, used in URL routing |
| brand       | STRING    | e.g. "Apple"         |
| description | TEXT      | Short product summary |
| specs       | JSONB     | Key-value spec pairs (camera, battery, etc.) |

**variants**
| Column       | Type          | Notes                          |
|--------------|---------------|----------------------------------|
| id           | INTEGER       | Primary key, auto-increment     |
| productId    | INTEGER (FK)  | References `products.id`        |
| variantSlug  | STRING        | e.g. "256gb-orange"             |
| storage      | STRING        | e.g. "256GB"                    |
| color        | STRING        | e.g. "Orange"                   |
| mrp          | DECIMAL(10,2) | Original price                  |
| price        | DECIMAL(10,2) | Discounted/selling price        |
| image        | STRING        | Product image URL               |

**emi_plans**
| Column         | Type          | Notes                          |
|----------------|---------------|----------------------------------|
| id             | INTEGER       | Primary key, auto-increment     |
| variantId      | INTEGER (FK)  | References `variants.id`        |
| tenureMonths   | INTEGER       | EMI duration in months          |
| monthlyAmount  | DECIMAL(10,2) | Monthly payment amount          |
| interestRate   | DECIMAL(4,2)  | e.g. 0.00 or 10.50               |
| cashback       | DECIMAL(10,2) | Additional cashback offered     |

**Relationships:**
- One `Product` → many `Variants` (`onDelete: CASCADE`)
- One `Variant` → many `EmiPlans` (`onDelete: CASCADE`)

---

## Core Features

- Dynamic product listing and detail pages, all data fetched from the backend API (no hardcoded frontend data)
- Unique URLs per product (`/products/:slug`)
- Variant switching (storage/color) with live price and EMI plan updates
- EMI plan selection with tenure, interest rate, and cashback details
- Checkout summary page showing selected product, variant, and EMI plan
- Responsive layout with Tailwind CSS, navbar, and footer

---

