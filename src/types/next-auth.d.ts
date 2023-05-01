import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      token: string
      name: string
      _id: string
    }
  }
}
