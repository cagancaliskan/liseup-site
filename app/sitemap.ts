import type { MetadataRoute } from "next";

const BASE_URL = "https://liseup.org";

const STATIC_ROUTES = [
  "",
  "liseliler",
  "okullar",
  "kurumlar",
  "hakkimizda",
  "ekip",
  "dernek",
  "basari-hikayeleri",
  "blog",
  "iletisim",
  "sss",
  "kvkk",
  "gizlilik-politikasi",
  "kullanim-kosullari",
  "pilot-basvuru",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path ? `/${path}` : ""}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("/") ? 0.5 : 0.7,
  }));
}
