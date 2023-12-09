import { getPageByUri } from "../../utils/getPageByUri";
import { BlockRenderer } from "../../components/BlockRenderer";
import { getPageSeo } from "../../utils/getPageSeo";
import { notFound } from "next/navigation";
import { getFontSizeForHeading } from "../../utils/fonts";
import { getLatestPosts } from "../../utils/getLatestPosts";
import PostSearch from "../../components/PostSearch/PostSearch";

const MAX_DISPLAY = 6

export default async function Page({ params }) {
  const data = await getPageByUri('blog');
  const dataPosts = await getLatestPosts();
  const {posts, total} = dataPosts

  if(!data?.blocks) {
    notFound()
  }
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className={`font-bold font-heading max-w-5xl mx-auto my-5 leading-tight ${getFontSizeForHeading(1)} text-left`}>
            Blog
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Những tin tức mới nhất về Lào Cai Web
          </p>
          <div>
            <PostSearch/>
          </div>
        </div>
      </div>
    </>
  )
}
export async function generateMetadata({ params }) {
  const seo = await getPageSeo('blog');
  if(!seo){
    return {
      title: '404 | Không tìm thấy nội dung'
    }
  }
  return {
    metadataBase: new URL(`https://laocaiweb.com/${'blog'}`),
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
