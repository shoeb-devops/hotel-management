# 🏨 StaySync — Premium Hotel Management System

> **A 5-Star & 3-Star Adaptive Hospitality ERP & Online Booking Platform**  
> Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Prisma ORM**, and **PostgreSQL (Supabase)**.

---

## 🌟 Key Features

### 🌐 1. Guest-Facing Luxury Website
- **Hero & Live Booking Bar**: Real-time room availability checker (Check-in, Check-out, Guests, Room Types).
- **Accommodations Showcase (`/rooms`)**: Multi-filter catalog (Standard, Deluxe, Executive, Presidential, Family) with specs and instant booking buttons.
- **Suite Details (`/rooms/[id]`)**: High-res image gallery, interactive price calculator, amenities matrix, and house policies.
- **Booking Engine (`/booking`)**: 4-step wizard:
  1. Room & Duration Selection
  2. Primary Guest Information & Special Requests
  3. Luxury Addons (Gourmet Buffet, Chauffeur Pickup, Couples Spa, Early Check-in)
  4. Multi-Gateway Checkout (**bKash / Nagad / SSLCommerz / Stripe**) with coupon code validation (`WELCOME20`).
- **Visual Journey Gallery (`/gallery`)**: Categorized photo masonry grid with interactive modal lightbox.
- **About Heritage (`/about`)**: Hotel story, executive management, and five-star quality standards.
- **24/7 Concierge & Contact (`/contact`)**: Instant inquiry dispatch and interactive FAQs.

---

### 🔐 2. Admin & Staff Operational ERP Dashboard
- **Executive Dashboard (`/dashboard`)**: KPI overview cards, revenue trajectory area chart, daily check-in/out counts, room occupancy pie chart, and recent reservations table.
- **Room Matrix (`/rooms`)**: Floor-by-floor visual grid tracking real-time status:
  - 🟢 **Available**
  - 🔴 **Occupied** (with current guest & check-out time)
  - 🟡 **Reserved**
  - 🟣 **Housekeeping**
  - 🔵 **Maintenance**
- **Reservations & Folio (`/bookings`)**: Manage walk-in guests, handle digital check-in & check-out, and track outstanding balances.
- **Guest CRM & VIP Loyalty (`/guests`)**: Tiered VIP badges (Regular, Silver, Gold, Platinum, VIP Royal), NID/Passport verification, and lifetime spending logs.
- **Billing & Reconciliation (`/billing`)**: Reconcile bKash, Nagad, Stripe, and SSLCommerz card payments with PDF invoice exports.
- **Housekeeping Board (`/housekeeping`)**: Real-time room turnover tracking with interactive inspection checklists.
- **Human Resources (`/staff`)**: Staff directory, duty shifts (Morning, Evening, Night), and departmental assignments.
- **Financial Intelligence (`/reports`)**: RevPAR, ADR, occupancy yield, sales channel mix (Recharts), and Excel/PDF printing.
- **Star-Rating Configurator (`/settings`)**: Dynamic switch between **⭐⭐⭐ 3-Star**, **⭐⭐⭐⭐ 4-Star**, and **⭐⭐⭐⭐⭐ 5-Star** presets.

---

## 🚀 Getting Started

### 1. Prerequisites
Make sure [Node.js 18+](https://nodejs.org/) is installed on your computer.

### 2. Install Dependencies
In your terminal, navigate to the project directory and run:
```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase database credentials:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_SECRET="your-generated-secret-key"
```

### 4. Database Setup (Prisma & Supabase)
Generate the Prisma Client and seed the database with demo rooms, guests, staff, and coupons:
```bash
npx prisma db push
npm run db:seed
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view the Admin Dashboard!

---

## 🎨 Color Palette & Design System
- **Deep Hotel Navy**: `#1B2A4A` (Command, Trust, Sophistication)
- **Artisanal Gold**: `#C5A55A` (Luxury Accent, Ratings, CTAs)
- **Luxury Cream**: `#F8F6F3` (Soft Background, Contrast)
- **Charcoal Text**: `#2D2D2D` (High Readability)

---

## 📄 License
StaySync Proprietary Hospitality Suite. All rights reserved.
