/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'img.clerk.com',
      'placehold.co',
    ],
  },
  reactStrictMode: true,
}

export default nextConfig;
