import type { NextConfig } from "next";
import type  withBundleAnalyzer  from "@next/bundle-analyzer";

const withBundleAnalyzer:any= {
  enabled: process.env.ANALYZE === "true",
};

const nextConfig:NextConfig = {
  reactStrictMode: true,
};

export default  withBundleAnalyzer(nextConfig);