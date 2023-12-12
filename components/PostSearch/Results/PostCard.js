import Image from "next/image";
import Link from "next/link";
import formatDate from "../../../utils/formatDate";
import { frontendUrl } from "../../../utils/variables";

export default function PostCard({image, title, date, seo, uri}){
  return (
    <article>
      <div className="space-y-2 xl:grid xl:grid-cols-3 xl:items-start xl:space-y-0">
        <div className={'pr-2 mr-2'}>
          {image && (
            <Link
              href={`${frontendUrl}/${uri}`}
              className={'flex w-full relative h-[200px]'}>
              <Image
                src={image}
                priority="low"
                fill
                alt=""
                sizes="300px"
                style={{ objectFit: "cover" }}
              />
            </Link>
          )}
        </div>
        <div className="space-y-5 xl:col-span-2">
          <div className="space-y-3">
            <div>
              <h2 className="text-2xl font-bold font-heading leading-8 tracking-tight">
                <Link
                  href={`${frontendUrl}/${uri}`}
                  className="text-gray-900 dark:text-gray-100"
                >
                  {title}
                </Link>
              </h2>
              <div className={'flex gap-2 text-sm mt-1 leading-6 text-gray-600 dark:text-gray-400'}>
                Ngày đăng
                <dl>
                  <dt className="sr-only">Ngày đăng</dt>
                  <dd className="">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="prose max-w-none text-gray-700 dark:text-gray-400">
              {seo.metaDesc}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link
              href={`${frontendUrl}/${uri}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Read more: "${title}"`}
            >
              Xem thêm &rarr;
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
