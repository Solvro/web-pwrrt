import { withPayload } from "@payloadcms/next/withPayload";
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
};

const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig));
