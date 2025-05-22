/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required if you're using <Image />
  },
  basePath: '/your-repo-name', // Important for routing!
};

module.exports = nextConfig;