import type { MetadataRoute } from "next";
import { getCommissions, getSiteConfig } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteConfig();
  const commissions = await getCommissions();
  const staticRoutes = [
    "",
    "/que-fem",
    "/com-ho-fem",
    "/quotes-i-us",
    "/comissions",
    "/menus-menjador",
    "/contacte",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
    })),
    ...commissions.map((commission) => ({
      url: `${site.url}/comissions/${commission.slug}`,
      lastModified: new Date(),
    })),
  ];
}
