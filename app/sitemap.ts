import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://focusify.io",
      lastModified: new Date(),
    },
    {
      url: "https://focusify.io/app",
      lastModified: new Date(),
    },
  ];
}
