/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zuhlehzrwffsgqpobqcw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // output: "export",
};

export default nextConfig;

/* stars are left in pathName that tells Next.js that any image will work.  */
