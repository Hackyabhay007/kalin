/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3-alpha-sig.figma.com', 'cloud.appwrite.io','encrypted-tbn0.gstatic.com'], // Add Appwrite domain here
  },
};

export default nextConfig;
