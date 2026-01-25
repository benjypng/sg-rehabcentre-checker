import { Container, Title } from '@mantine/core'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/lib/auth'
import { getDb } from '@/app/lib/mongodb'
import { Organisation } from '@/app/lib/types'

import { Header } from '../components/Header'
import AdminForm from './AdminForm'

export default async function AdminUpdatePage() {
  const session = await getServerSession(authOptions)

  if (!session || String(session.user.role_id) !== '1') {
    redirect('/login')
  }

  const db = await getDb()
  const orgs = await db
    .collection<Organisation>('organisations')
    .find({})
    .sort({ order: 1 })
    .toArray()

  const serializedOrgs = orgs.map((org) => ({
    ...org,
    _id: org._id.toString(),
    last_updated: org.last_updated?.toISOString() || null,
  }))

  return (
    <main>
      <Header />
      <Container size="xl" py="xl">
        <Title mb="lg">Admin Update Dashboard</Title>
        <AdminForm orgs={serializedOrgs} />
      </Container>
    </main>
  )
}
