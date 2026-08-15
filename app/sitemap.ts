import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neeraja-portfolio-09.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentPages = [
    "/thinking",
    "/workflows",
    "/insights",
    "/kubernetes",
    "/terraform",
    "/kafka",
    "/cloud",
    "/automation",
    "/observability",
    "/evidence",
    "/engagement",
    "/open-source",
    "/resources",
    "/sre-intel",
  ];

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...contentPages.map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
