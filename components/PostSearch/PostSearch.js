"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PostCard from "./Results/PostCard";
import queryString from "query-string";
import { Pagination } from "../PropertySearch/Pagination";
import { Filters } from "./Filters";

const MAX_DISPLAY = 6

export default function PostSearch({initData, initTotal}){
  const [posts, setPosts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || null
  const searchTerm = searchParams.get('searchTerm') || ''

  const search = async (key, page) => {
    const filters = {
      searchTerm: key || ""
    };

    const response = await fetch(`/api/search-posts`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
        ...filters,
      }),
    });

    const data = await response.json();
    setPosts(data.posts);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNumber) => {
    let route = `${pathname}?page=${pageNumber}`
    if(searchTerm){
      route += `&searchTerm=${searchTerm}`
    }
    router.push(route);
    search(searchTerm, pageNumber)
  };

  const handleSearch = async ({ searchTerm }) => {
    let route = `${pathname}?page=1`
    if(searchTerm){
      route += `&searchTerm=${searchTerm}`
    }
    router.push(route);
    search(searchTerm, 1)
  };


  useEffect(() => {
    if(searchTerm){
      search(searchTerm, page)
    } else {
      setPosts(initData)
      setTotalResults(initTotal)
    }
  }, []);


  return (
    <>
      <div>
        <Filters onSearch={handleSearch} />
        <div className={'text-gray-600 text-sm'}>
          {searchTerm && (
            <p>Kết quả tìm kiếm cho từ khóa: <strong className={'text-black'}>{searchTerm}</strong></p>
          )}
          <p>Hiển thị {totalResults} bài viết - trang {page || 1}</p>
        </div>
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
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / MAX_DISPLAY)}
      />
    </>
  )
}
