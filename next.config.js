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
    editionUpdateAuthority: "3wP5sQ8E5vkGaWU3FLFX9fXibDjTt56BUGAMP8pe33FX",
    editionName: "exp edition",
  },
};

module.exports = nextConfig;
