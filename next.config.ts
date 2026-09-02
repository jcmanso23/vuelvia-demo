import type { NextConfig } from "next";

const repoName = "vuelvia-demo";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
    NEXT_PUBLIC_SITE_URL: isGithubPages
      ? `https://jcmanso23.github.io/${repoName}`
      : "http://localhost:3100",
  },
};

export default nextConfig;
