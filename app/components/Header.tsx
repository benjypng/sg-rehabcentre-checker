'use client'

import { Button, Container, Group, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    notifications.show({
      title: 'Success',
      message: 'Logged out successfully',
      color: 'green',
    })
    router.push('/')
  }

  return (
    <Container size="xl" py="md">
      <Group justify="space-between">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Title order={3}>SG RehabCentre Checker</Title>
        </Link>
        <Group>
          {session ? (
            <>
              <Button
                component={Link}
                href={
                  session.user.role_id === '1' ? '/admin-update' : '/update'
                }
              >
                Update
              </Button>
              <Button
                component={Link}
                href="/change-password"
                variant="default"
              >
                Change Password
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
        </Group>
      </Group>
    </Container>
  )
}
