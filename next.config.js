/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "63cba5a8b482d8503aeb7d5380687574.r2.cloudflarestorage.com",
      "pub-04e9733611a446c795c941ee1f33b86a.r2.dev",
      "images.slimes.xyz",
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
    cloudflareStorage: "https://images.slimes.xyz",
    //NEXT_PUBLIC_CDN_URL: "https://storage.googleapis.com/slimes-assets",
  },
};

module.exports = nextConfig;
