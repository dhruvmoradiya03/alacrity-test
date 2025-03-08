/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
  },
};

export default nextConfig;
