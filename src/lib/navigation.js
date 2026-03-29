'use client'

/**
 * Navigation Compatibility Layer
 *
 * Provides react-router-dom-like APIs using Next.js navigation.
 * This allows existing page components to work without rewriting
 * every `<Link>`, `useNavigate()`, and `useLocation()` call.
 *
 * Import from '@/lib/navigation' instead of 'react-router-dom'.
 */

import NextLink from 'next/link'
import { useRouter, usePathname, useSearchParams, useParams as nextUseParams } from 'next/navigation'
import { forwardRef, useMemo } from 'react'

/**
 * Drop-in replacement for react-router-dom's <Link>.
 * Maps `to` prop to `href` for Next.js.
 */
const Link = forwardRef(function Link({ to, href, children, className, style, onClick, target, rel, ...rest }, ref) {
  const resolvedHref = to || href || '/'
  return (
    <NextLink
      href={resolvedHref}
      className={className}
      style={style}
      onClick={onClick}
      target={target}
      rel={rel}
      ref={ref}
      {...rest}
    >
      {children}
    </NextLink>
  )
})

/**
 * Drop-in replacement for react-router-dom's useNavigate().
 * Returns a function: navigate('/path') or navigate(-1) for back.
 */
function useNavigate() {
  const router = useRouter()
  return useMemo(() => {
    const navigate = (to, options) => {
      if (typeof to === 'number') {
        if (to === -1) router.back()
        else if (to === 1) router.forward()
        return
      }
      if (options?.replace) {
        router.replace(to)
      } else {
        router.push(to)
      }
    }
    return navigate
  }, [router])
}

/**
 * Drop-in replacement for react-router-dom's useLocation().
 * Returns { pathname, search, hash, state }.
 */
function useLocation() {
  const pathname = usePathname()
  // searchParams can only be used in a Suspense boundary in Next.js 14+
  // We provide a safe fallback
  let search = ''
  try {
    const searchParams = useSearchParams()
    search = searchParams?.toString() ? `?${searchParams.toString()}` : ''
  } catch {
    search = ''
  }

  return useMemo(() => ({
    pathname,
    search,
    hash: typeof window !== 'undefined' ? window.location.hash : '',
    state: null, // Next.js doesn't have location state
  }), [pathname, search])
}

/**
 * Drop-in replacement for react-router-dom's useParams().
 */
function useParams() {
  return nextUseParams()
}

/**
 * Drop-in replacement for react-router-dom's <NavLink>.
 * Supports className/style as functions that receive { isActive }.
 */
const NavLink = forwardRef(function NavLink({ to, href, className, style, children, end, ...rest }, ref) {
  const pathname = usePathname()
  const resolvedHref = to || href || '/'
  
  // Determine if this link is "active"
  const isActive = end
    ? pathname === resolvedHref
    : pathname.startsWith(resolvedHref) && (resolvedHref !== '/' || pathname === '/')
  
  const resolvedClassName = typeof className === 'function' 
    ? className({ isActive }) 
    : className
  const resolvedStyle = typeof style === 'function' 
    ? style({ isActive }) 
    : style

  return (
    <NextLink
      href={resolvedHref}
      className={resolvedClassName}
      style={resolvedStyle}
      ref={ref}
      {...rest}
    >
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  )
})

export { Link, NavLink, useNavigate, useLocation, useParams }
export default Link
