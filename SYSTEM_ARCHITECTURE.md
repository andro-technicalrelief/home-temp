# Technical Relief — System Architecture

> **Living Document** — This file is the single source of truth for how all systems are integrated.
> Updated whenever code changes affect integrations. Last updated: **2026-03-26**.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow & Integration Points](#data-flow--integration-points)
3. [Next.js App Router (Frontend + API)](#nextjs-app-router-frontend--api)
4. [Firebase Authentication](#firebase-authentication)
5. [GoHighLevel (CRM)](#gohighlevel-crm)
6. [HostAfrica (Domain & VPS Reseller)](#hostafrica-domain--vps-reseller)
7. [DirectAdmin Integration](#directadmin-integration)
8. [n8n Automation](#n8n-automation)
9. [PayFast Payments](#payfast-payments)
10. [Environment Variables](#environment-variables)

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────────┐
│                  TECHNICAL RELIEF PLATFORM (Next.js)                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  React Frontend (Next.js App Router)                                │
│  ├── Public Pages (/, /hosting, /vps, /domains, /about, etc.)       │
│  ├── Client Dashboard (/dashboard/*)                                │
│  │   ├── Overview, Infrastructure, Services, Projects               │
│  │   ├── Billing: Invoices, Wallet, Subscriptions, Reports          │
│  │   ├── Support (Client Ticket Submission + Reply)                 │
│  │   └── Settings (Personal, Branding, Team, Notifs, Security)      │
│  └── Admin Dashboard (/admin/*)                                     │
│      ├── Pipeline Overview, Client CRM details                      │
│      └── Ticket Queue                                               │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│         Next.js Server-Side API Routes (app/api/*)                  │
│  Secure proxy for all backend services (keeps API keys hidden)      │
├──────────────┬──────────────┬──────────────┬────────────────────────┤
│  Firebase    │ GoHighLevel  │  HostAfrica  │  DirectAdmin           │
│  Auth        │ CRM API      │  Reseller    │  Server API            │
│  (Auth+Users)│ (Contacts,   │  (Domains,   │  (Hosting SSO,         │
│              │  Pipelines)  │   VPS)       │   R100/mo fee)         │
├──────────────┼──────────────┼──────────────┼────────────────────────┤
│  PayFast     │  n8n         │  MySQL/DB    │  Vercel/Netlify        │
│  Payments    │  Automation  │  (via        │  (Next.js Deployment)  │
│              │  (Webhooks)  │   GHL/HA)    │                        │
└──────────────┴──────────────┴──────────────┴────────────────────────┘
```

---

## Data Flow & Integration Points

1. **Sign Up**: 
   - User registers via Firebase Auth.
   - Frontend calls Next.js `/api/ghl/contacts` proxy to create a GHL contact linked to the Firebase UID.
   - Contact tagged as `new-client`.

2. **Login**:
   - User authenticates via Firebase Auth.
   - Frontend calls `searchContacts` via GHL proxy to retrieve the GHL contact profile.
   - Auth state context is populated with GHL data (tags, pipeline stages).

3. **Purchasing & Provisioning**:
   - Payments processed via PayFast.
   - `/api/webhooks/payfast` ITN verifies payment.
   - Pipeline stage updated in GHL to "Active".
   - HostAfrica API triggered to register domain or provision VPS.
   - DirectAdmin account generated with R100/mo base subscription fee.

4. **Automation & Emails**:
   - GHL pipeline changes trigger n8n webhooks.
   - n8n orchestrates automated email sequences (welcome, setup, past due).

---

## Next.js App Router (Frontend + API)

The platform has been migrated from Vite + React Router to Next.js 16.

- **Routing**: Uses the App Router (`app/` directory). All previous `react-router-dom` links use a custom compatibility shim at `src/lib/navigation.js`.
- **Server API proxy**: All external API calls (GHL, HostAfrica, DA) route through `app/api/` endpoints to keep credentials server-side.
- **Styling**: Tailwind CSS v4 configured via `@tailwindcss/postcss`.

---

## Firebase Authentication

Firebase Auth is the primary authentication provider.

- Handles login, registration, password reset, and session persistence.
- `AuthContext.jsx` manages the sync between Firebase Auth state and GoHighLevel CRM profiles.
- Configuration uses `NEXT_PUBLIC_FIREBASE_*` variables.

---

## GoHighLevel (CRM)

GoHighLevel (GHL) is the central CRM, replacing the deprecated Blesta implementation.

- **Endpoints**: Proxied through `/api/ghl/*`.
- **Purpose**: Single source of truth for Contacts, Pipelines, Opportunities, Tags, Notes, and Conversations (support tickets).
- **Service Layer**: `src/services/ghlApi.js`.

---

## HostAfrica (Domain & VPS Reseller)

HostAfrica's WHMCS-compatible reseller API handles infrastructure ordering.

- **Endpoints**: Proxied through `/api/hostafrica/*`.
- **Domain API**: Uses `HOSTAFRICA_API_EMAIL` and `HOSTAFRICA_API_KEY`. Supports WHOIS, register, transfer, renew, and DNS changes.
- **VPS API**: Uses `HOSTAFRICA_VPS_API_KEY` and `HOSTAFRICA_VPS_API_PASSWORD`. Supports VPS plan listing, ordering, status checks, and actions (start/stop).
- **Service Layer**: `src/services/hostafricaApi.js`.

---

## DirectAdmin Integration

DirectAdmin manages site hosting at `server.technicalrelief.co.za:2222`.

- **SSO Login**: Users can auto-login without entering credentials via `/api/da/login-key` which generates temporary session keys using `CMD_API_LOGIN_KEYS`.
- **Billing Add-on**: A mandatory R100/mo DirectAdmin fee is attached to all hosting packages, calculated via `src/services/pricingEngine.js`.

---

## n8n Automation

Automated workflows are managed by an n8n instance at `n8n.technicalrelief.co.za`.

- Triggered via Next.js `/api/webhooks/n8n` or directly natively by GHL pipeline stage changes.
- Handles automated welcome emails, setup guides, and internal team notifications.

---

## PayFast Payments

PayFast serves as the primary gateway for ZAR transactions.

- Checkout handles card and instant EFT transactions.
- Webhooks (ITN) trigger backend server verification and subsequent provisioning scripts.

---

## Environment Variables

All secrets are managed via environment variables. Create a `.env.local` file based on `.env.local.example`.

### Publicly Accessible (Client-Side)
Prefix: `NEXT_PUBLIC_`
- `NEXT_PUBLIC_FIREBASE_API_KEY`, etc.
- `NEXT_PUBLIC_DIRECTADMIN_URL`

### Server-Side Only (Never EXPOSED)
- `GHL_API_KEY`, `GHL_LOCATION_ID`
- `HOSTAFRICA_API_EMAIL`, `HOSTAFRICA_API_KEY`
- `HOSTAFRICA_VPS_API_KEY`, `HOSTAFRICA_VPS_API_PASSWORD`
- `DA_ADMIN_USER`, `DA_ADMIN_PASS`, `DA_SERVER_URL`
- `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY`, `PAYFAST_PASSPHRASE`
- `N8N_WEBHOOK_URL`
