import { getPageByUri } from "../../../utils/getPageByUri";
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPageSeo } from "../../../utils/getPageSeo";
import { notFound } from "next/navigation";
import { getPostByUri } from "../../../utils/getPostByUri";
import { getPostSeo } from "../../../utils/getPostSeo";

export default async function Page({ params }) {
  const data = await getPostByUri(params.slug.join('/'));

  if(!data?.content) {
    notFound()
  }
  return (
    <article>
      <div
        dangerouslySetInnerHTML={{ __html: data.content }}
        className={'prose-lg max-w-none pb-8 pt-10 dark:prose-invert'}
      >
      </div>
    </article>
  )
}
export async function generateMetadata({ params }) {
  const seo = await getPostSeo(params.slug.join('/'));
  if(!seo){
    return {
      title: '404 | Không tìm thấy nội dung'
    }
  }
  return {
    metadataBase: new URL(`https://laocaiweb.com/${params.slug.join('/')}`),
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
