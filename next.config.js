/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    google: "AIzaSyCa0-Tlg3hWHLqeN67wYQZ5uZGYSLNioIc",
    NODEENV: "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "findmyplutophotobucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
