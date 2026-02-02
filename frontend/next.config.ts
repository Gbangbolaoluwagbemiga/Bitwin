import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-ignore
  turbopack: {
     root: path.resolve(process.cwd(), '..'),
  }
};

export default nextConfig;
