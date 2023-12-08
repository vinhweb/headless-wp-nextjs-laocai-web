import { getPageByUri } from "../utils/getPageByUri";
import { BlockRenderer } from "../components/BlockRenderer";
import { getPageSeo } from "../utils/getPageSeo";

export default async function Page() {
  const data = await getPageByUri("/");
  return (
    <div>
      <BlockRenderer blocks={data.blocks} />
    </div>
  );
}

export async function generateMetadata() {
  const seo = await getPageSeo("/");
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
