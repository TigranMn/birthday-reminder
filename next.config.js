/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  env: {
    MONGO_URI: process.env.MONGO_URI
  },
  typescript: {
    ignoreBuildErrors: true
  }
}
