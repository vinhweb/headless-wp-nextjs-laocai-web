import getTotalCounts from "../../lib/getTotalCounts";
import getSitemapPages from "../../utils/getSitemapPages";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {

  const details = await getTotalCounts();
  let sitemapIndex = `<?xml version='1.0' encoding='UTF-8'?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${details.map((item) => getSitemapPages(item)).join("")}
    </sitemapindex>`;

  const newHeaders = new Headers()
  newHeaders.set("Content-Type", "text/xml; charset=utf-8");
  newHeaders.set(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=600"
  );

  return new Response(sitemapIndex, {
    headers: newHeaders
  })
}


