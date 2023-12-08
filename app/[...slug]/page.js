import { getPageByUri } from "../../utils/getPageByUri";
import { BlockRenderer } from "../../components/BlockRenderer";
import { getPageSeo } from "../../utils/getPageSeo";

export default async function Page({ params }) {
  const data = await getPageByUri(params.slug.join("/"));
  return <BlockRenderer blocks={data.blocks} />;
}
export async function generateMetadata({ params }) {
  const seo = await getPageSeo(params.slug.join("/"));
  return {
    title: seo.title || "",
    description: seo.metaDesc || "",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seo.title || "",
      description: seo.metaDesc || "",
      type: seo.opengraphType || "",
      publishedTime: seo.opengraphPublishedTime || "",
      lastModified: seo.opengraphModifiedTime || "",
      images: [
        {
          url: seo.opengraphImage?.mediaItemUrl || "",
        },
      ],
    },
  };
}
