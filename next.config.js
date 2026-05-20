const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  turbopack: {
    root: path.join(__dirname),
  },
}

module.exports = nextConfig
