import { getPageByUri } from "../../utils/getPageByUri";
import { BlockRenderer } from "../../components/BlockRenderer";
import { getPageSeo } from "../../utils/getPageSeo";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const data = await getPageByUri(params.slug);
  if(!data?.blocks) {
    notFound()
  }
  return (
    <BlockRenderer blocks={data.blocks} />
  )
}
export async function generateMetadata({ params }) {
  const seo = await getPageSeo(params.slug);
  if(!seo){
    return {
      title: '404 | Không tìm thấy nội dung'
    }
  }
  return {
    metadataBase: new URL(`https://laocaiweb.com/${params.slug}`),
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
