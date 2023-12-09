"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PostCard from "./Results/PostCard";
import queryString from "query-string";
import { Pagination } from "../PropertySearch/Pagination";
import { Filters } from "./Filters";

const MAX_DISPLAY = 6

export default function PostSearch(){
  const [posts, setPosts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const search = async () => {
    const { page, searchTerm } =
      queryString.parse(window.location.search);
    const filters = {
      searchTerm: searchTerm || ""
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
    const { searchTerm } = queryString.parse(
      window.location.search
    );

    router.push(
      `${pathname}?page=${pageNumber}&searchTerm=${searchTerm}`
    );
  };

  useEffect(() => {
    search();
  }, []);

  const handleSearch = async ({ searchTerm, }) => {
    router.push(
      `${pathname}?page=1&searchTerm=${searchTerm}`
    );
  };


  return (
    <>
      <Filters onSearch={handleSearch} />
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
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / MAX_DISPLAY)}
      />
    </>
  )
}
