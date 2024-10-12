/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          'via.placeholder.com',
          'localhost', 
          'your-domain.com', 
          'i.pinimg.com', 
          'cdn.europosters.eu', 
          'example.com',
          'cdn.myanimelist.net',
          'media.kitsu.app',
          's4.anilist.co'
      ], // Allow external images from these domains
  },
};

export default nextConfig;
