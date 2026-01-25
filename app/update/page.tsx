import type { Metadata } from 'next'
import { Container, Title } from '@mantine/core'
import { ObjectId } from 'mongodb'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/lib/auth'
import { getDb } from '@/app/lib/mongodb'
import { Organisation } from '@/app/lib/types'

import { Header } from '../components/Header'
import UpdateForm from './UpdateForm'

export const metadata: Metadata = {
  title: 'Update Vacancy | SG Rehabcentre Checker',
}

export default async function UpdatePage() {
  const session = await getServerSession(authOptions)

  if (!session || String(session.user.role_id) !== '2') {
    redirect('/login')
  }

  const db = await getDb()
  const org = await db.collection<Organisation>('organisations').findOne({
    _id: new ObjectId(session.user.org_id),
  })

  if (!org) return <div>Organisation not found</div>

  const serializedOrg = {
    ...org,
    _id: org._id.toString(),
    last_updated: org.last_updated?.toISOString() || null,
  }

  return (
    <main>
      <Header />
      <Container size="xl" py="xl">
        <Title mb="lg">Update {org.org_name}</Title>
        <UpdateForm org={serializedOrg} />
      </Container>
    </main>
  )
}
