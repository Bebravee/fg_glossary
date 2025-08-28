import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // говорим Turbopack: svg можно обрабатывать svgr
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js", // svg становится js-компонентом
      },
    }
  },
};

export default nextConfig;
