# Technical Relief — Blesta & DirectAdmin Setup Guide

This guide walks through configuring Blesta and DirectAdmin for the Technical Relief website's features: client authentication,
Two-Factor Authentication (2FA), password reset, email notifications, and DirectAdmin SSO.

---

## 1. Blesta Configuration

### 1.1 Update Website Auth URLs

Once Blesta is installed, update these placeholder URLs across the site:

| File | Button/Link | Update `href` to |
|---|---|---|
| `login.html` | "Sign In to Dashboard" | `https://YOUR-BLESTA-URL/client/login/` |
| `register.html` | "Create Your Account" | `https://YOUR-BLESTA-URL/order/` |
| `forgot-password.html` | "Reset Password" | `https://YOUR-BLESTA-URL/client/login/reset/` |
| `client-area.html` | "Hosting Control Panel" | DirectAdmin URL or Blesta SSO URL |
| All pricing pages | "Get Started" buttons | `https://YOUR-BLESTA-URL/order/config/index/PRODUCT-GROUP/` |

### 1.2 Configure Two-Factor Authentication (2FA)

Blesta supports TOTP (Google Authenticator, Authy) and MOTP natively.

**Enable 2FA system-wide:**
1. Go to **Settings → Company → General → Security**
2. Set **"Two-Factor Authentication"** to **Enabled**
3. Choose allowed methods: **TOTP** (recommended) and/or **MOTP**

**Client-side:** Clients enable 2FA from **Account Settings → Security** in the Blesta client portal.

**Emergency 2FA Reset (admin):**
If a client loses their 2FA device:
```sql
-- Run against your Blesta database
DELETE FROM client_values
WHERE client_id = {CLIENT_ID}
AND `key` IN ('two_factor_mode', 'two_factor_key', 'two_factor_pin');
```

### 1.3 Configure Password Reset

Blesta has a built-in password reset mechanism with time-limited email links.

**Configuration:**
1. Go to **Settings → Company → General → Client Options**
2. Set `reset_password_ttl` — link expiration in minutes (default: 30)
3. Set `default_password_reset_value` — security settings for the reset flow

**Customise the reset email template:**
1. Go to **Settings → Company → Emails → Client Emails**
2. Edit the **"Password Reset"** template
3. Use tags like `{reset_url}`, `{client.first_name}`, `{company.name}`

### 1.4 Configure Email Notifications (SMTP)

**Set up SMTP:**
1. Go to **Settings → Company → Emails → Mail Settings**
2. Choose **SMTP** as the delivery method
3. Enter your SMTP details:
   - Host: `mail.technicalrelief.co.za` (or your SMTP provider)
   - Port: `587` (TLS) or `465` (SSL)
   - Username: `noreply@technicalrelief.co.za`
   - Password: Your email password
   - Security: TLS (recommended)

**Key email templates to customise:**
| Template | Purpose |
|---|---|
| Account Registration | Welcome email on signup |
| Password Reset | Reset link email |
| Service Creation | New hosting/VPS created |
| Invoice Created | New invoice notification |
| Payment Confirmation | Payment received |
| Service Suspension | Overdue payment notice |

**To customise templates:**
1. Go to **Settings → Company → Emails → Client Emails**
2. Select the template
3. Edit HTML content (Blesta 5.11+ supports full HTML emails)
4. Use Blesta template tags for dynamic content

### 1.5 Configure Products (for "Get Started" links)

1. Go to **Packages → Products/Services**
2. Create Product Groups matching your tiers:
   - **Web Hosting** (Starter R49, Pro R149, Enterprise R399)
   - **VPS Hosting** (Starter R299, Pro R699, Enterprise R1,499)
3. Update pricing page buttons with direct product checkout links:
   ```
   https://YOUR-BLESTA-URL/order/config/index/PRODUCT-GROUP/?group_id=X
   ```

---

## 2. DirectAdmin Configuration

### 2.1 Enable 2FA in DirectAdmin

1. Login to DirectAdmin admin panel
2. Go to **Admin Settings → Security**
3. Enable **Two-Factor Authentication** (TOTP)
4. Clients can then enable 2FA from their DirectAdmin user panel

### 2.2 Configure SSO from Blesta to DirectAdmin

**Blesta v5.12.0+ (Built-in SSO):**
1. In Blesta, go to **Settings → Modules → DirectAdmin**
2. Configure the DirectAdmin module with your server details
3. SSO is automatically available — clients click "Login" from their service page
4. Blesta generates a temporary SSO session and redirects to DirectAdmin

**Blesta < v5.12.0 (Manual Setup):**
1. Install the DirectAdmin module in Blesta
2. Configure server details (hostname, port, admin credentials)
3. Use the `CMD_LOGIN_KEYS` API to create temporary session links
4. Add a custom "Login to Panel" button on the service detail page

### 2.3 DirectAdmin Server Details

Update the control panel link in `client-area.html`:
```html
<!-- Option A: Direct DirectAdmin URL -->
<a href="https://YOUR-DIRECTADMIN-URL:2222/">

<!-- Option B: Via Blesta SSO (recommended) -->
<a href="https://YOUR-BLESTA-URL/client/services/manage/SERVICE_ID/">
```

---

## 3. Image Placeholders

Drop your branding images into the `/images/` folder:

| Image | Where It Appears | Recommended Size |
|---|---|---|
| `logo.png` | Navbar + footer (all pages) | 200×50px, transparent PNG |
| `header-logo.png` | Hero section on index.html | 400×100px, transparent PNG |
| `favicon.png` | Browser tab icon | 32×32px or 64×64px PNG |
| `favicon.ico` | Legacy browser tab icon | 16×16px ICO |

Then uncomment the `<img>` and `<link>` tags across the HTML files.

---

## 4. DNS & Domain Pointing

If using a subdomain for Blesta (e.g., `billing.technicalrelief.co.za`):
1. Create an A record: `billing` → Your Blesta server IP
2. Install SSL on the Blesta subdomain
3. Configure Blesta's **System → General → Basic Setup → Company URL**

---

## 5. Quick Verification Checklist

- [ ] Blesta installed and accessible at billing URL
- [ ] SMTP sending test email successfully
- [ ] Password reset flow works end-to-end
- [ ] 2FA can be enabled by test client
- [ ] DirectAdmin SSO working from Blesta service page
- [ ] All "Get Started" buttons link to correct Blesta products
- [ ] All auth page redirects (login, register, reset) work
- [ ] Logo and favicon images display correctly
- [ ] Email templates customised with Technical Relief branding
