import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageByUri = async (uri) => {
  const params = {
    query: `query PageQuery($uri: String!) {
      nodeByUri(uri: $uri) {
        ... on Page {
          id
          title
          blocks
          content
        }
        ... on Property {
          id
          title
          blocks
          content
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

  return {
    title: data.nodeByUri?.title,
    content: data.nodeByUri?.content,
    mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
    callToActionLabel:
      data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
    callToActionDestination:
      data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    blocks,
  };
};
