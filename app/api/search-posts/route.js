import { NextResponse } from "next/server";

const MAX_DISPLAY = 6

export async function POST(request) {
  try {
    const filters = await request.json();

    const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query PostsQuery {
          posts(where: { 
            offsetPagination: { size: ${MAX_DISPLAY}, offset: ${((filters.page || 1) - 1) * MAX_DISPLAY} }
            search: "${filters?.searchTerm}"
          }) {
            pageInfo {
              offsetPagination {
                total
              }
            }
            nodes {
              databaseId
              title
              uri
              date
              seo {
                metaDesc
              }
              featuredImage {
                node {
                  uri
                  sourceUrl
                }
              }
            }
          }
        }
      `,
      }),
    });
    const { data } = await response.json();

    return NextResponse.json({
      total: data.posts.pageInfo.offsetPagination.total,
      posts: data.posts.nodes,
    });
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
