/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any https image host so profile photos / project images can be
    // pasted in as plain URLs (e.g. from Supabase Storage, Imgur, etc.)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
