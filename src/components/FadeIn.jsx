import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Scroll-triggered fade-up animation wrapper.
 * Wraps any content and animates it into view when scrolled to.
 */
export default function FadeIn({ children, delay = 0, duration = 0.6, className = '', y = 30 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered children animation — each child fades in with a delay offset.
 */
export function StaggerContainer({ children, stagger = 0.1, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
