export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/companies', '/companies/:path', '/birthdays', '/birthdays/:path', '/']
}
