import { getPageByUri } from "../../../utils/getPageByUri";
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPageSeo } from "../../../utils/getPageSeo";
import { notFound } from "next/navigation";
import { getPostByUri } from "../../../utils/getPostByUri";
import { getPostSeo } from "../../../utils/getPostSeo";
import { getFontSizeForHeading } from "../../../utils/fonts";
import Image from "next/image";
import formatDate from "../../../utils/formatDate";

export default async function Page({ params }) {
  const data = await getPostByUri('blog/'+params.slug.join('/'));

  if(!data?.content) {
    notFound()
  }
  return (
    <article>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div>
          <h1 className={`font-bold font-heading max-w-5xl mx-auto my-5 leading-tight ${getFontSizeForHeading(2)} text-left`}>
            {data.title}
          </h1>
          <div className="pb-4 z-10">
            Ngày đăng {formatDate(data.date)} - Tác giả: Vinh Web
          </div>
        </div>
        <div className="flex w-full relative h-[200px]">
          <Image
            src={data.featuredImage}
            priority="low"
            fill
            alt=""
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className={'prose-lg max-w-none py-8 dark:prose-invert'}
        >
          <blockquote
            dangerouslySetInnerHTML={{ __html: data.excerpt }}
            className="relative z-10 text-left text-opacity-95 text-xl pl-4 border-l-4 border-lime-200"
          />
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
          >
          </div>
        </div>
      </div>
    </article>
  )
}
export async function generateMetadata({ params }) {
  const seo = await getPostSeo('blog/' + params.slug.join('/'));
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
