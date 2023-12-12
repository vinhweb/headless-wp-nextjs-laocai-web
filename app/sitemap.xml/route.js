import getTotalCounts from "../../lib/getTotalCounts";
import getSitemapPages from "../../utils/getSitemapPages";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req) {
  const details = await getTotalCounts();
  let sitemapIndex = `<?xml version='1.0' encoding='UTF-8'?>
    <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd"
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
      ${details.map((item) => getSitemapPages(item)).join("")}
    </sitemapindex>`;

  return new Response(sitemapIndex)
}


