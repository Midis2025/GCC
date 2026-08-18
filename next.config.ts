import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Investor targeting has its own top-level page; keep one canonical
        // URL for it rather than duplicating the content under /services.
        source: "/services/investor-outreach",
        destination: "/investor-outreach",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
