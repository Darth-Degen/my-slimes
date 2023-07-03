/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  env: {
    apiKey: "SHMxG54Cyd@hU",
    apiUrl: "https://slimes.expapi.link",
    //TODO: needed for merch
    editionUpdateAuthority: "3wP5sQ8E5vkGaWU3FLFX9fXibDjTt56BUGAMP8pe33FX",
    editionName: "exp edition",
    NEXT_PUBLIC_CDN_URL: "https://storage.googleapis.com/slimes-assets",
  },
};

module.exports = nextConfig;
