// src/app/conference-standings/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CFPHistory = dynamic(() => import('@/components/CFPHistory'), {
  loading: () => <p>Loading...</p>,
})

export default function ConferenceChampionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CFPHistory />
    </Suspense>
  )
}