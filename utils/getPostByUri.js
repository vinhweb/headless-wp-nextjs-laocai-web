import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPostByUri = async (uri) => {
  const params = {
    query: `query PostQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Post {
          id
          blocks
          databaseId
          date
          modified
          slug
          title(format: RENDERED)
          excerpt(format: RENDERED)
          content(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
        }
      }
      acfOptionsMainMenu {
        mainMenu {
          callToActionButton {
            label
            destination {
              ... on Page {
                uri
              }
            }
          }
          menuItems {
            menuItem {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
            items {
              destination {
                ... on Page {
                  uri
                }
              }
              label
            }
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
  const blocks = data.nodeByUri ? cleanAndTransformBlocks(data.nodeByUri.blocks) : null

  if(data.nodeByUri?.featuredImage?.node.mediaDetails.sizes){
    data.nodeByUri?.featuredImage?.node.mediaDetails.sizes.sort((a,b) =>  b.width - a.width)
  }

  return {
    title: data.nodeByUri?.title,
    mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
    callToActionLabel:
      data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
    callToActionDestination:
      data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    blocks,
    content: data.nodeByUri?.content,
    date: data.nodeByUri?.date,
    modified: data.nodeByUri?.modified,
    excerpt: data.nodeByUri?.excerpt,
    featuredImage: data.nodeByUri?.featuredImage?.node.mediaDetails.sizes[0].sourceUrl,
  };
};
