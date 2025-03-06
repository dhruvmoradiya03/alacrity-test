/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_ENDPOINT: process.env.NEXT_ENDPOINT,
  },
};

export default nextConfig;
