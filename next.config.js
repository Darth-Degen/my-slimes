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
    editionName: "RACKS",
    editionUpdateAuthority: "8vizj4VUCM44RJgkPgzm6oG852KgVN5iFfYyFq9HBAFR",
    //dev
    devEditionName: "exp edition",
    devEditionUpdateAuthority: "3wP5sQ8E5vkGaWU3FLFX9fXibDjTt56BUGAMP8pe33FX",
    NEXT_PUBLIC_CDN_URL: "https://storage.googleapis.com/slimes-assets",
  },
};

module.exports = nextConfig;
