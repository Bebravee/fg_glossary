import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        // говорим Turbopack: svg можно обрабатывать svgr
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js", // svg становится js-компонентом
        },
      },
    },
  },
};

export default nextConfig;
