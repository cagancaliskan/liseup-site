import type { MetadataRoute } from "next";

const BASE_URL = "https://liseup.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app",
          "/app/",
          "/okul",
          "/okul/",
          "/kurum",
          "/kurum/",
          "/yonetim",
          "/yonetim/",
          "/veli-onay",
          "/davet/okul",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
