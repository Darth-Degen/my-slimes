/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "63cba5a8b482d8503aeb7d5380687574.r2.cloudflarestorage.com",
      "pub-04e9733611a446c795c941ee1f33b86a.r2.dev",
    ],
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
      {
        protocol: "https",
        hostname: "63cba5a8b482d8503aeb7d5380687574.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    apiKey: "SHMxG54Cyd@hU",
    apiUrl: "https://slimes.expapi.link",
    //TODO: needed for merch
    editionName: "RACKS",
    editionUpdateAuthority: "8vizj4VUCM44RJgkPgzm6oG852KgVN5iFfYyFq9HBAFR",
    //dev
    devEditionName: "exp edition",
    devEditionUpdateAuthority: "3wP5sQ8E5vkGaWU3FLFX9fXibDjTt56BUGAMP8pe33FX",
    cloudflareStorage:
      process.env.NODE_ENV === "production"
        ? "https://63cba5a8b482d8503aeb7d5380687574.r2.cloudflarestorage.com/slimes"
        : "https://pub-04e9733611a446c795c941ee1f33b86a.r2.dev",
    //https://storage.googleapis.com/slimes-assets
    cloudflareAccessKey: "5c56370d0d5f43b672ad912a9ace06e7",
    cloudlfareSecretKey:
      "a83686fcdf878b66ba030f41a27b1da659eb1a4851a3c769d20e882413129084",
  },
};

module.exports = nextConfig;
