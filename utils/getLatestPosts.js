export const getLatestPosts = async () => {
  const params = {
    query: `query LatestPostQuery {
       properties(where: { 
        offsetPagination: { size: 3 }
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
    posts: data.properties.nodes,
    total: data.properties.pageInfo.offsetPagination.total,
  };
};
