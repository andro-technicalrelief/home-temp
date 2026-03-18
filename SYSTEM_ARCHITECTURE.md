# Technical Relief — System Architecture

> **Living Document** — This file is the single source of truth for how all systems are integrated.
> Updated whenever code changes affect integrations. Last updated: **2026-03-16 20:58**.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [DirectAdmin Integration](#directadmin-integration)
3. [Firebase Authentication](#firebase-authentication)
4. [Blesta Billing Engine](#blesta-billing-engine)
5. [n8n Email & Workflow Automation](#n8n-email--workflow-automation)
6. [PayFast Payment Gateway](#payfast-payment-gateway)
7. [Data Flow & Where Data Lives](#data-flow--where-data-lives)
8. [Environment Variables](#environment-variables)
9. [Current Implementation Status](#current-implementation-status)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     TECHNICAL RELIEF PLATFORM                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  React Frontend (Vite + Tailwind)                                  │
│  ├── Public Pages (/, /hosting, /vps, /domains, /about, etc.)      │
│  ├── Client Dashboard (/dashboard/*)                               │
│  │   ├── Overview, Infrastructure, Services, Projects              │
│  │   ├── Billing: Invoices, Wallet, Subscriptions, Reports         │
│  │   ├── Cost Breakdown (Billing Transparency)                     │
│  │   ├── Support (Client Ticket Submission + Reply)                │
│  │   └── Settings (Personal, Branding, Team, Notifs, Security)     │
│  └── Admin Dashboard                                               │
│      └── Ticket Queue (Staff Reply, Status/Priority Control)       │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                       BACKEND SERVICES                              │
├──────────────┬──────────────┬──────────────┬───────────────────────┤
│  Firebase    │  Blesta      │  DirectAdmin │  n8n                  │
│  Auth        │  Billing API │  Server API  │  Automation           │
│  (Auth+Users)│  (Invoices)  │  (Hosting)   │  (Workflows)          │
├──────────────┼──────────────┼──────────────┼───────────────────────┤
│  PayFast     │  HostAfrica  │  VPS         │  Netlify/Render       │
│  Payments    │  DNS/Domains │  (Database)  │  (Frontend/API hosts) │
└──────────────┴──────────────┴──────────────┴───────────────────────┘
```

---

## DirectAdmin Integration

### What is DirectAdmin?

DirectAdmin is the server control panel running on your VPS at `https://server.technicalrelief.co.za:2222`. It manages:
- Hosting accounts (creating, suspending, terminating)
- Email accounts (mailboxes, forwarders, autoresponders)
- Databases (MySQL creation, phpMyAdmin)
- DNS zone editing
- SSL certificate management (Let's Encrypt)
- File Manager, backups, cron jobs

### How to Link the "Login to DirectAdmin" Button

The dashboard has a "DirectAdmin" quick link in the sidebar. Here's the integration path:

#### Option A: Direct URL Link (Simplest — ✅ Currently Active)

The quick links now use environment variables from `.env`:

```
URL: https://server.technicalrelief.co.za:2222

Login credentials:
- Username: The DirectAdmin username created for the client
- Password: The password set during account provisioning
```

**Where to change:** `src/components/DashboardLayout.jsx` → `quickLinks` array

```javascript
const quickLinks = [
  { label: 'DirectAdmin', href: import.meta.env.VITE_DIRECTADMIN_URL || 'https://server.technicalrelief.co.za:2222', icon: '🖥️' },
  { label: 'Webmail', href: import.meta.env.VITE_WEBMAIL_URL || 'https://server.technicalrelief.co.za/roundcube', icon: '📧' },
]
```

#### Option B: Session Login URL (SSO — Recommended for production)

DirectAdmin supports session-based login via the API. This lets you log a user into DirectAdmin without them re-entering credentials:

```
POST https://server.technicalrelief.co.za:2222/CMD_API_LOGIN_KEYS
Headers: Authorization: Basic <admin_base64>
Body: action=create&user=<client_da_username>&expire=300&clear=yes

Response: { key: "abc123..." }

Redirect URL: https://server.technicalrelief.co.za:2222/CMD_LOGIN_KEY/<key>
```

**Integration steps:**
1. Your backend proxy calls DirectAdmin's `CMD_API_LOGIN_KEYS` with admin credentials
2. DirectAdmin returns a temporary login key (valid 5 minutes)
3. Frontend redirects the user to the key URL — they're logged in without typing credentials
4. **Important:** Admin credentials must NEVER be exposed to the frontend

#### Option C: Blesta DirectAdmin Module (If using Blesta's DA plugin)

If Blesta has the DirectAdmin module installed:
1. Blesta automatically creates DA accounts when a hosting service is provisioned
2. The DA username/password is stored in Blesta's service record
3. You can fetch credentials via `blestaApi.getClientServices()` and show a "Login" button
4. Blesta can also handle auto-login via its DirectAdmin SSO integration

### Current File References

| File | What it does | Status |
|------|-------------|--------|
| `src/components/DashboardLayout.jsx` | Quick links (DirectAdmin, Webmail) | ✅ Wired to env vars |
| `src/services/infrastructureApi.js` | DirectAdmin API wrapper | ✅ Mock implementation ready |
| `src/services/provisioningEngine.js` | Full provisioning chain including DA account creation | ✅ Mock implementation ready |
| `.env.example` | `VITE_DIRECTADMIN_URL` env var | ✅ Defined |

---

## Firebase Authentication

### Status: ✅ INTEGRATED

Firebase Auth is now live. The auth system supports **dual-mode**: Firebase for production users, demo clients for testing.

Capabilities:
- ✅ Email/password login via `signInWithEmailAndPassword`
- ✅ User registration via `createUserWithEmailAndPassword`
- ✅ Email verification via `sendEmailVerification`
- ✅ Password reset via `sendPasswordResetEmail`
- ✅ Password change via `updatePassword`
- ✅ Auth state persistence via `onAuthStateChanged`
- ✅ Friendly error messages for all Firebase error codes
- ✅ Demo client fallback (password = email for testing)

### Integration Plan

#### Step 1: Install Firebase

```bash
npm install firebase
```

#### Step 2: Create Firebase Config

Create `src/config/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
```

#### Step 3: Refactor AuthContext.jsx

Replace the demo login with Firebase Auth:

```javascript
import { auth } from '../config/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
} from 'firebase/auth'

// In AuthProvider:
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // User is signed in — fetch their Blesta profile
      const blestaProfile = await getClientDetails(firebaseUser.uid)
      setUser({ ...blestaProfile, firebaseUid: firebaseUser.uid })
    } else {
      setUser(null)
    }
    setLoading(false)
  })
  return unsubscribe
}, [])

const login = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return { success: true, uid: cred.user.uid }
}

const register = async (email, password, profileData) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(cred.user)
  // Create Blesta client record linked to Firebase UID
  await registerClient({ ...profileData, firebase_uid: cred.user.uid })
  return { success: true }
}

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email)
}

const changePassword = async (newPassword) => {
  await updatePassword(auth.currentUser, newPassword)
}

const logout = async () => {
  await signOut(auth)
}
```

#### Step 4: Firebase ↔ Blesta User Linking

```
Firebase Auth (authentication) ←→ Blesta (billing profile)

Firebase UID is the bridge:
- Firebase handles: login, signup, password reset, email verification
- Blesta handles: invoices, services, billing address, payment methods
- Link: store firebase_uid in Blesta client record metadata
```

#### Step 5: Add Firebase Env Vars to .env

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=technicalrelief.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=technicalrelief
VITE_FIREBASE_STORAGE_BUCKET=technicalrelief.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Current File References

| File | What it does | Status |
|------|-------------|--------|
| `src/context/AuthContext.jsx` | Dual-mode auth (Firebase + demo clients) | ✅ Integrated |
| `src/config/firebase.js` | Firebase SDK initialization | ✅ Created |
| `src/pages/LoginPage.jsx` | Login form UI | ✅ Works with Firebase |
| `src/pages/dashboard/SettingsPage.jsx` | Settings with password change UI | ✅ Built |
| `.env` | Firebase config values | ✅ Populated |
| `.env.example` | Template with all env vars | ✅ Updated |

---

## Blesta Billing Engine

### What Blesta Handles

- Client accounts and profiles
- Invoices (generate, send, mark paid)
- Service records (hosting, VPS, domains)
- Payment processing (via PayFast gateway)
- Support tickets (via API — currently using mock `TicketContext`)
- Automated billing cycles
- Cron jobs for renewals and reminders

### API Endpoints (Already Implemented)

All endpoints are defined in `src/services/blestaApi.js`:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `users/login` | POST | Authenticate client |
| `clients/create` | POST | Register new client |
| `clients/get/:id` | GET | Get client profile |
| `clients/edit/:id` | PUT | Update client profile |
| `clients/services/:id` | GET | List client services |
| `invoices/getall/:id` | GET | List invoices |
| `support/tickets/:id` | GET | List support tickets |
| `support/tickets/create` | POST | Open new ticket |
| `support/tickets/reply/:id` | POST | Reply to ticket |
| `orders/create` | POST | Create order |
| `payment_methods/*` | CRUD | Card token management |
| `subscriptions/*` | CRUD | Auto-pay management |

### Blesta API Access

```
Base URL: https://www.technicalrelief.co.za/billing/api
Auth: HTTP Basic Auth (user: API_USER, pass: API_KEY)
Format: JSON
```

### Billing Plans

| Plan | Monthly | Includes |
|------|---------|----------|
| **Starter Hosting** | R550 | Shared hosting, 1 website, 10GB SSD, DirectAdmin |
| **Professional Hosting** | R850 | 5 websites, 25GB SSD, email, SSL |
| **Business Hosting** | R1,500 | Unlimited websites, 50GB NVMe, priority support |
| **VPS Starter** | R2,500 | 2 vCPU, 4GB RAM, 80GB NVMe + DirectAdmin license |
| **VPS Growth** | R4,500 | 4 vCPU, 8GB RAM, 160GB NVMe + DirectAdmin license |
| **VPS Enterprise** | R8,500 | 8 vCPU, 16GB RAM, 320GB NVMe + DirectAdmin license |
| **VPS Management** | R2,500/mo | Server admin, monitoring, security hardening (add-on) |

**Price floors enforced in code:** Shared hosting min R550/mo, VPS min R2,500/mo.

### Current File References

| File | What it does | Status |
|------|-------------|--------|
| `src/services/blestaApi.js` | Full Blesta API client (25+ endpoints) | ✅ Ready — needs live API URL |
| `src/services/pricingEngine.js` | Domain/hosting pricing with margins | ✅ Implemented |
| `src/pages/dashboard/BillingPage.jsx` | Invoice/order/payment UI | ✅ Built |
| `src/pages/dashboard/WalletPage.jsx` | Card tokenization + PayFast | ✅ Built |
| `src/pages/dashboard/SubscriptionsPage.jsx` | Auto-pay management | ✅ Built |
| `src/pages/dashboard/BillingTransparencyPage.jsx` | Infrastructure cost breakdown | ✅ Built |

---

## n8n Email & Workflow Automation

### What n8n Handles

n8n is the automation engine running background workflows:

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Welcome email** | Client registers | Send branded welcome email via SMTP |
| **Invoice reminder** | 3 days before due | Email client with invoice link |
| **Payment confirmation** | PayFast webhook | Send receipt + activate service |
| **SSL expiry warning** | Daily cron | Check certs, email if <7 days |
| **Backup notification** | Daily cron | Confirm backup success, alert on failure |
| **Ticket auto-reply** | Ticket created | Send acknowledgment email to client |
| **Domain renewal warning** | 30 days before expiry | Email client with renewal prompt |

### Integration Point

```
n8n instance URL: https://n8n.technicalrelief.co.za (self-hosted on VPS)

Trigger types:
1. Webhooks — n8n listens for PayFast/Blesta callbacks
2. Cron — n8n runs scheduled checks (SSL, backups, renewals)
3. API calls — React frontend triggers n8n workflows via REST
```

### Email Setup

```
SMTP Provider: DirectAdmin's built-in mail server (or external like Brevo/SendGrid)
From: noreply@technicalrelief.co.za
Reply-To: support@technicalrelief.co.za
Templates: n8n HTML email nodes with dynamic variables
```

### Cron Configuration

The cron command for Blesta's scheduled tasks (generated in `src/services/systemUtils.js`):

```bash
*/5 * * * * curl -s "https://technicalrelief.co.za/cron?cron_key=<YOUR_KEY>" > /dev/null 2>&1
```

**Important:** Output redirects to `/dev/null` — **no trailing slash**. This was fixed in `systemUtils.js`.

Cron key can be rotated from: **Dashboard → Settings → Security & API tab**.

### Current File References

| File | What it does | Status |
|------|-------------|--------|
| `src/services/systemUtils.js` | Cron path fix, API key rotation | ✅ Implemented |
| `src/pages/dashboard/SettingsPage.jsx` | Security & API tab (key management) | ✅ Built |

---

## PayFast Payment Gateway

### Integration Architecture

```
Client Browser → React Wallet UI → PayFast Tokenization (3D Secure)
                                      ↓
                              PayFast stores card token
                                      ↓
                    Backend receives token → stored in Blesta
                                      ↓
              Monthly charge: Backend calls PayFast ad-hoc endpoint
```

### Key Points

- **Zero card data** on Technical Relief servers (PCI-DSS compliance)
- PayFast handles 3DS, card storage, recurring charges
- Tokens stored in Blesta's payment method records
- Pro-rata billing calculated by `pricingEngine.js` for mid-cycle changes

### Current File References

| File | What it does | Status |
|------|-------------|--------|
| `src/services/payfastApi.js` | PayFast tokenization + charge API | ✅ Mock ready |
| `src/pages/dashboard/WalletPage.jsx` | Card linking UI | ✅ Built |

---

## Data Flow & Where Data Lives

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Firebase Auth  │     │   Blesta (VPS)   │     │  DirectAdmin     │
│                  │     │                  │     │  (VPS)           │
│  • User accounts │────▶│  • Client profile│────▶│  • Hosting accts │
│  • Passwords     │     │  • Invoices      │     │  • Email accts   │
│  • Email verify  │     │  • Services      │     │  • Databases     │
│  • Sessions      │     │  • Orders        │     │  • DNS zones     │
│                  │     │  • Tickets       │     │  • SSL certs     │
│  firebase_uid ──────────▶ client_id       │     │  • Backups       │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        │                         │                        │
        │                         ▼                        │
        │                ┌──────────────────┐              │
        │                │  PayFast Vault   │              │
        │                │  • Card tokens   │              │
        │                │  • Subscriptions │              │
        │                └──────────────────┘              │
        │                                                  │
        ▼                                                  ▼
┌──────────────────┐                              ┌──────────────────┐
│  React Frontend  │                              │  n8n (VPS)       │
│  (Netlify)       │                              │  • Email sends   │
│  • Dashboard UI  │◀────── API Calls ───────────▶│  • Cron checks   │
│  • Public pages  │                              │  • Webhooks      │
└──────────────────┘                              └──────────────────┘
```

### Data Ownership

| Data | Where it lives | Backup? |
|------|---------------|---------|
| User auth (login/password) | Firebase | Firebase handles backups |
| Client profiles, invoices | Blesta on VPS | VPS daily backups |
| Hosting accounts, email | DirectAdmin on VPS | DirectAdmin + VPS backups |
| Card tokens | PayFast vault | PayFast responsibility |
| Automation workflows | n8n on VPS | VPS backups + JSON exports |
| Frontend code | GitHub → Netlify | Git history |

---

## Environment Variables

Current `.env.example`:

```bash
# Blesta API
VITE_BLESTA_API_URL=https://www.technicalrelief.co.za/billing/api

# DirectAdmin
VITE_DIRECTADMIN_URL=https://server.technicalrelief.co.za:2222
VITE_WEBMAIL_URL=https://server.technicalrelief.co.za/roundcube

# Firebase (TODO — add when setting up)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# PayFast
VITE_PAYFAST_MERCHANT_ID=
VITE_PAYFAST_MERCHANT_KEY=
VITE_PAYFAST_PASSPHRASE=

# n8n
VITE_N8N_WEBHOOK_URL=https://n8n.technicalrelief.co.za/webhook
```

---

## Current Implementation Status

### ✅ Fully Built (Frontend)

| Feature | File(s) |
|---------|---------|
| Public marketing pages | `HomePage`, `HostingPage`, `VPSPage`, `DomainsPage`, `AboutPage` |
| Knowledge Base | `KnowledgeBasePage.jsx` |
| Login / Sign up | `LoginPage.jsx` |
| Dashboard overview | `OverviewPage.jsx` |
| Infrastructure monitor | `InfrastructurePage.jsx` |
| Services management | `ServicesPage.jsx` |
| Billing (invoices, orders) | `BillingPage.jsx` |
| Wallet (card linking) | `WalletPage.jsx` |
| Subscriptions (auto-pay) | `SubscriptionsPage.jsx` |
| Cost breakdown (transparency) | `BillingTransparencyPage.jsx` |
| Support tickets (client) | `SupportPage.jsx` |
| Admin ticket queue | `AdminTicketsPage.jsx` |
| Settings (5 tabs) | `SettingsPage.jsx` |
| Security & API key rotation | `SettingsPage.jsx` → Security tab |
| Cron path fix | `systemUtils.js` |
| Shared ticket context | `TicketContext.jsx` |
| Provisioning engine (mock) | `provisioningEngine.js` |
| Pricing engine | `pricingEngine.js` |
| Firebase Auth (dual-mode) | `AuthContext.jsx` + `firebase.js` |
| Firebase config | `src/config/firebase.js` |

### ⚠️ Needs Backend Wiring

| Feature | What's needed |
|---------|---------------|
| Blesta API → Live | Point `VITE_BLESTA_API_URL` to real Blesta installation |
| DirectAdmin SSO | Implement login key API for auto-login (Option B above) |
| PayFast → Live | Set merchant ID/key, implement tokenization callback |
| Tickets → Blesta API | Replace `TicketContext` mock with `blestaApi.js` ticket calls |
| n8n webhooks | Configure n8n workflows and connect webhook URLs |

### ❌ Not Started

| Feature | Notes |
|---------|-------|
| Backend proxy | Express/Edge Function to secure API keys from browser |
| Email templates | n8n workflow templates for welcome, invoice, SSL alerts |
| Mobile responsive audit | Some dashboard pages need mobile polish |

---

> **Note for AI assistants:** When modifying any integration-related code (auth, billing, provisioning, API services), update this document to reflect the change. Keep the "Current Implementation Status" section accurate.
