const MAX_DISPLAY = 6

export const getLatestPosts = async () => {
  const params = {
    query: `query LatestPostQuery {
       posts(where: { 
        offsetPagination: { size: ${MAX_DISPLAY} }
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
  };

  const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  return {
    posts: data.posts.nodes,
    total: data.posts.pageInfo.offsetPagination.total,
  };
};
