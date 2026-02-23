# NexusHost — Premium Managed Hosting & Full-Stack Agency

A static HTML/CSS/JS marketing website for a premium managed hosting and full-stack web development agency targeting South African businesses.

## Tech Stack

- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (no frameworks)
- **Design:** Mobile-first responsive, Inter typography, dark navy + electric blue palette
- **SEO:** Semantic HTML, unique meta tags per page, proper heading hierarchy

## Project Structure

```
hosting-agency/
├── index.html                   # Landing page
├── pricing.html                 # Plans & pricing comparison
├── knowledge-base.html          # Help & documentation index
├── about.html                   # Company philosophy & values
├── client-area.html             # Client dashboard entry point
├── terms.html                   # Terms & Conditions
├── privacy.html                 # Privacy Policy (POPIA)
├── css/
│   └── styles.css               # Global design system + components
├── js/
│   └── script.js                # Minimal JS (nav, scroll, animations)
└── services/
    ├── web-hosting.html          # Shared hosting plans
    ├── vps-hosting.html          # VPS hosting plans
    ├── domains.html              # Domain registration
    ├── development.html          # Full-stack development
    └── web-design.html           # UI/UX design services
```

## Future-Proofing & Integration Notes

### Billing & Client Area (Blesta)
- All `/login`, `/register`, and `/client` routes should redirect to white-labelled Blesta
- Blesta handles: invoicing, payment processing, plan provisioning, support tickets
- PayFast is the payment gateway (PCI DSS compliant)
- Blesta → DirectAdmin SSO plugin for hosting control panel access

### Hosting Control Panel (DirectAdmin)
- White-labelled DirectAdmin for hosting management
- SSO from Blesta eliminates separate login
- Clients access file manager, databases, email, DNS from DirectAdmin

### Automation (n8n)
Planned workflow automations:
- New registration → Welcome email sequence
- Payment received → Auto-provision hosting via Blesta API
- Support ticket created → Slack notification
- Domain expiry approaching → Renewal reminder emails
- VPS resource alerts → Customer notification

### Migration Paths
1. **Next.js Migration:** This static site can be migrated to Next.js for SSR/SSG when dynamic features are needed
2. **Custom Dashboard:** Replace Blesta client area with custom Next.js dashboard
3. **API Layer:** Build REST API to sync Blesta/DirectAdmin data with custom frontend
4. **Headless Commerce:** Integrate headless e-commerce for domain/hosting purchases directly on this site

## Design Tokens (CSS Custom Properties)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-dark` | `#0a1628` | Primary background |
| `--color-bg-navy` | `#0f1d32` | Secondary background |
| `--color-accent` | `#3b82f6` | Primary accent (electric blue) |
| `--color-accent-hover` | `#2563eb` | Hover state |
| `--color-success` | `#10b981` | Success/check indicators |
| `--color-warning` | `#f59e0b` | Warning states |

72: ## Running Locally
73: 
74: Run the following commands to start the development server on port 3000 and automatically open it in your browser:
75: 
76: ```bash
77: # Install dependencies (first time only)
78: npm install
79: 
80: # Start the server
81: npm run dev
82: ```


## Deployment

This is a static site — deploy to any hosting provider, CDN, or object storage:
- Upload via FTP to shared hosting
- Deploy to Netlify/Vercel for preview
- Serve from Nginx on VPS

## Legal

- Terms & Conditions follow South African law
- Privacy Policy is POPIA-compliant
- Payment processing via PayFast (SA-based, PCI DSS compliant)
