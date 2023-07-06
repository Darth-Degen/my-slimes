/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arweave.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    apiKey: "SHMxG54Cyd@hU",
    apiUrl: "https://slimes.expapi.link",
    //TODO: needed for merch
    editionUpdateAuthority: "9D9UBwZ5L6Mr5JJJ8Y5cTvJJ6vGW4zCjDbPGmd6XTy7f",
    editionName: "exp edition",
    NEXT_PUBLIC_CDN_URL: "https://storage.googleapis.com/slimes-assets",
  },
};

module.exports = nextConfig;
