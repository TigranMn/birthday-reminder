/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false
}

module.exports = {nextConfig,
    env: {
        // declare here all your variables
        MONGO_URI: process.env.MONGO_URI,
      }}
