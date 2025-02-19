// src/app/conference-standings/page.tsx
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ConferenceChampions = dynamic(() => import('@/components/ConferenceChampionHistory'), {
  loading: () => <p>Loading...</p>,
})

export default function ConferenceChampionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConferenceChampions />
    </Suspense>
  )
}