import { getDb } from '@/app/lib/mongodb'
import { Organisation } from '@/app/lib/types'

import HomePageClient from './components/HomePageClient'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const db = await getDb()
  const orgs = await db
    .collection<Organisation>('organisations')
    .find({})
    .sort({ order: 1 })
    .toArray()

  const serializedOrgs = orgs.map((org) => ({
    ...org,
    _id: org._id.toString(),
    last_updated: org.last_updated ? org.last_updated.toISOString() : null,
  }))

  return <HomePageClient orgs={serializedOrgs} />
}
