export const getPageSeo = async (uri) => {
  const params = {
    query: `query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
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
        ... on Property {
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
  return data.nodeByUri?.seo || {};
};
