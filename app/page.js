import { getPageByUri } from "../utils/getPageByUri";
import { BlockRenderer } from "../components/BlockRenderer";
import { getPageSeo } from "../utils/getPageSeo";
import { getLatestPosts } from "../utils/getLatestPosts";
import Link from "next/link";
import PostCard from "../components/PostSearch/Results/PostCard";
import { getFontSizeForHeading } from "../utils/fonts";

const MAX_DISPLAY = 6

export default async function Page() {
  const { content, title } = await getPageByUri('/');
  const data = await getLatestPosts();
  const {posts, total} = data

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <div>
            <h1 className={`font-bold font-heading max-w-5xl mx-auto my-5 leading-tight ${getFontSizeForHeading(1)} text-left`}>
              {title}
            </h1>
            <div className={'prose max-w-full'} dangerouslySetInnerHTML={{__html: content}}></div>
          </div>
          <hr/>
          <div className={''}>
            <h2 className={`font-bold font-heading leading-tight ${getFontSizeForHeading(2)} text-left`}>Bài Viết Mới Nhất</h2>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Những tin tức mới nhất về Lào Cai Web
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { uri, date, title, seo } = post

              if(post.featuredImage?.node.mediaDetails.sizes){
                post.featuredImage?.node.mediaDetails.sizes.sort((a,b) =>  b.width - a.width)
              }
              const image = post.featuredImage?.node?.mediaDetails.sizes[0].sourceUrl
              return (
                <li key={uri} className="py-12">
                  <PostCard
                    date={date}
                    title={title}
                    image={image}
                    seo={seo}
                    uri={uri}
                  />
                </li>
                )
              })}
          </ul>
        </div>
        {total > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              Tất cả bài viết &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function generateMetadata() {
  const seo = await getPageSeo("/");
  return {
    metadataBase: new URL('https://laocaiweb.com/'),
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
