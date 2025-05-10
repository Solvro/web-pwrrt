/* eslint-disable unicorn/no-useless-promise-resolve-reject */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return Promise.resolve([
      {
        source: "/team",
        destination: "/team/RT14e",
        permanent: true,
      },
      {
        source: "/bolid",
        destination: "/bolid/RT12e",
        permanent: true,
      },
    ]);
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
