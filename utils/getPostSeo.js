export const getPostSeo = async (uri) => {
  const params = {
    query: `query PostQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Post {
          seo {
            opengraphImage {
              mediaItemUrl
            }
            opengraphModifiedTime
            opengraphPublishedTime
            opengraphTitle
            opengraphType
            opengraphUrl
            schema {
              raw
            }
            title
            metaDesc
            opengraphSiteName
            readingTime
            opengraphPublisher
          }
        }
      }
    }
  `,
    variables: {
      uri,
    },
  };

  const response = await fetch(`${process.env.WP_GRAPHQL_URL}`, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { data } = await response.json();
  return data?.nodeByUri?.seo || null;
};
