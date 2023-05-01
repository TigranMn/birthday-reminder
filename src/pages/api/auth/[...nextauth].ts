import { TSession, TSessionToken, TSessionUser } from '@/types/types'
import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import process from 'process'
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials as any
        try {
          const res = await axios.post('http://localhost:3000/api/sign-in', {
            username,
            password
          })
          return res.data
        } catch (e) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  },
  callbacks: {
    async session({ session, token }): Promise<TSession> {
      session.user = token.user as TSessionUser
      return session
    },
    async jwt({ token, user }: { token: JWT; user: unknown }): Promise<TSessionToken> {
      if (user) {
        token.user = user as TSessionUser
      }
      return token as TSessionToken
    }
  }
}

export default NextAuth(authOptions)
