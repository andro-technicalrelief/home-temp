'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LiveChatWidget from '@/components/LiveChatWidget'

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <LiveChatWidget />
    </>
  )
}
