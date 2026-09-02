import type { NextConfig } from "next";

const repoName = "vuelvia-demo";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const siteUrl = isGithubPages
  ? `https://jcmanso23.github.io/${repoName}`
  : process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3100";

const nextConfig: NextConfig = {
  // La exportación estática solo se usa para la demo en GitHub Pages
  // (GITHUB_PAGES=true). En Vercel corre como app Next.js normal, con
  // API routes y renderizado en servidor disponibles para el backend real.
  ...(isGithubPages ? { output: "export" as const, trailingSlash: true } : {}),
  images: { unoptimized: isGithubPages },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : "",
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
