import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic' // defaults to auto

import getTotalCounts from "../../../lib/getTotalCounts";
import generateSitemapPaths from "../../../utils/generateSitemapPaths";
import getSitemapPageUrls from "../../../lib/getSitemapPageUrls";

export async function GET(request, {params}) {
  const slug = params.slug

  let isXml = slug.endsWith(".xml");
  if (!isXml) {
    notFound()
  }
  let slugArray = slug.replace(".xml", "").split("_");
  let type = slugArray[0];
  let pageNo = slugArray[1]?.match(/(\d+)/)[0] ?? null;
  let page = pageNo ? parseInt(pageNo) : null;
  let possibleTypes = await getTotalCounts();
  if (!possibleTypes.some((e) => e.name === type)) {
    notFound()
  }
  let pageUrls = await getSitemapPageUrls({ type, page });
  if (!pageUrls?.length) {
    notFound()
  }
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${generateSitemapPaths(pageUrls)}
  </urlset>`;
  return new Response(sitemap)
}
