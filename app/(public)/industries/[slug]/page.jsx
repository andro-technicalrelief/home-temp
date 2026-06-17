'use client'

import { use } from 'react'
import IndustryPage from '@/views/IndustryPage'

export default function Page({ params }) {
  const resolvedParams = use(params)
  return <IndustryPage slug={resolvedParams.slug} />
}
