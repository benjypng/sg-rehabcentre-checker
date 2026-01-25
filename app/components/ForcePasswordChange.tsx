'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export function ForcePasswordChange() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (session?.user?.forceChangePassword && pathname !== '/change-password') {
      router.push('/change-password')
    }
  }, [session, pathname, router])

  return null
}
