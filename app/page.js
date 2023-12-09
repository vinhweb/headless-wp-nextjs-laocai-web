import { getPageByUri } from "../utils/getPageByUri";
import { BlockRenderer } from "../components/BlockRenderer";
import { getPageSeo } from "../utils/getPageSeo";
import { getLatestPosts } from "../utils/getLatestPosts";
import Link from "next/link";
import PostCard from "../components/PostSearch/Results/PostCard";

const MAX_DISPLAY = 3

export default async function Page() {
  const data = await getLatestPosts();
  const {posts, total} = data

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Mới nhất
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Những tin tức mới nhất về Lào Cai Web
          </p>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { uri, date, title, seo } = post
              const image = post.featuredImage?.node?.sourceUrl
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
