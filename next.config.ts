import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://avatar.iran.liara.run/public?s=200&v=4"),
      new URL("https://avatars.githubusercontent.com/**?s=200&v=4"),
    ],
  },
};

export default nextConfig;
