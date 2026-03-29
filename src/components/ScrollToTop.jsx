'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollToTop — scrolls window to top on route change.
 * Uses Next.js usePathname instead of react-router-dom's useLocation.
 */
export default function ScrollToTop() {
  const pathname = usePathname()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}
