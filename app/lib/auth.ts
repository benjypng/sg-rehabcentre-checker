import { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getHashedPassword } from '@/app/lib/hash'
import { getDb } from '@/app/lib/mongodb'
import { User as DbUser } from '@/app/lib/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      org_id: string
      role_id: string
      forceChangePassword: boolean
    } & DefaultSession['user']
  }
  interface User {
    id: string
    org_id: string
    role_id: string
    forceChangePassword: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    org_id: string
    role_id: string
    forceChangePassword: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const db = await getDb()
        const user = await db.collection<DbUser>('users').findOne({
          email: credentials.email,
        })

        if (!user) return null

        const inputHash = getHashedPassword(credentials.password)

        if (user.password === inputHash) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            org_id: user.org_id,
            role_id: user.role_id,
            forceChangePassword: credentials.password === 'password123',
          }
        }

        if (user.password === credentials.password) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            org_id: user.org_id,
            role_id: user.role_id,
            forceChangePassword: true,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.org_id = user.org_id
        token.role_id = user.role_id
        token.forceChangePassword = user.forceChangePassword
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.org_id = token.org_id
        session.user.role_id = token.role_id
        session.user.forceChangePassword = token.forceChangePassword
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.SESSION_SECRET,
}
