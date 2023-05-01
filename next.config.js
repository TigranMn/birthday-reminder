/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
}

module.exports = {
  nextConfig,
  env: {
    MONGO_URI: process.env.MONGO_URI
  }
}
