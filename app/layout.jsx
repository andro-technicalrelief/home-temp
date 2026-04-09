import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Technical Relief — Web Hosting, VPS & Domain Management',
  description: 'Professional web hosting, VPS servers, and domain management for South African businesses. Managed DirectAdmin hosting with 24/7 support.',
  keywords: 'web hosting, VPS, domain registration, South Africa, DirectAdmin, managed hosting',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
