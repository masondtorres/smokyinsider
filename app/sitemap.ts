import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smokyinsider.com";
  const routes = [
    "",
    "/go",
    "/do",
    "/see",
    "/eat",
    "/stay",
    "/deals",
    "/my-plan",
    "/start-here",
    "/about",
    "/contact",
    "/editorial-policy",
    "/affiliate-disclosure",
    "/sponsored-content-policy",
    "/privacy",
    "/terms",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}