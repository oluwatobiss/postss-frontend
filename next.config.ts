import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://avatar.iran.liara.run/**"),
      new URL("https://avatars.githubusercontent.com/**?v=4"),
    ],
  },
};

export default nextConfig;
