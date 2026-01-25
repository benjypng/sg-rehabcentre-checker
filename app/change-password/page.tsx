'use client'

import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  Title,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

import { changeUserPassword } from '../actions'

export default function ChangePasswordPage() {
  const { data: session } = useSession()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match',
        color: 'red',
      })
      return
    }

    if (!session?.user?.email) return

    setLoading(true)
    const res = await changeUserPassword(session.user.email, password)
    setLoading(false)

    if (res.success) {
      notifications.show({
        title: 'Success',
        message: 'Password changed. Please login again.',
        color: 'green',
      })
      await signOut({ redirect: false })
      router.push('/login')
    } else {
      notifications.show({
        title: 'Error',
        message: 'Error changing password',
        color: 'red',
      })
    }
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center">Change Password</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        You must change your password to continue.
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <PasswordInput
            label="New Password"
            required
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordInput
            label="Confirm Password"
            required
            mt="md"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
