
import Image from "next/image";
import { theme } from "../../theme";
import { PropertyFeatures } from "../PropertyFeatures";
import { TickItem } from "../TickItem";
import { Gallery } from "../Gallery";
import { FormspreeForm } from "../FormspreeForm";
import { CallToActionButton } from "../CallToActionButton";
import { Paragraph } from "../Paragraph";
import { Heading } from "../Heading";
import { PropertySearch } from "../PropertySearch";
import { Cover } from "../Cover";
import { Columns } from "../Columns";
import { Column } from "../Column";
import PostSearch from "../PostSearch/PostSearch";

export const BlockRenderer = ({ blocks }) => {
  return blocks?.map((block) => {
    switch (block.name) {
      case "acf/propertyfeatures": {
        return (
          <PropertyFeatures
            key={block.id}
            price={block.attributes.price}
            bathrooms={block.attributes.bathrooms}
            bedrooms={block.attributes.bedrooms}
            hasParking={block.attributes.has_parking}
            petFriendly={block.attributes.pet_friendly}
          />
        );
      }
      case "acf/tickitem": {
        return (
          <TickItem key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>
        );
      }
      case "core/gallery": {
        return (
          <Gallery
            key={block.id}
            columns={block.attributes.columns || 3}
            cropImages={block.attributes.imageCrop}
            items={block.innerBlocks}
          />
        );
      }
      case "acf/formspreeform": {
        return (
          <FormspreeForm
            key={block.id}
            formId={block.attributes.data.form_id}
          />
        );
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/post-title":
        return null
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />;
      }
      case "acf/posts-search": {
        return <PostSearch key={block.id} />;
      }
      case "core/cover": {
        if(!block?.attributes?.url){
          return null
        }
        return (
          <Cover
            key={block.id}
            background={block.attributes.url.replace("https:", "http:")}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/group":
      case "core/post-content":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        if(!block?.attributes?.url){
          return null
        }
        return (
          <Image
            key={block.id}
            src={block.attributes.url.replace("https:", "http:")}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
            priority="low"
          />
        );
      }
      case "core/list": {
        return (
          <ul>
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </ul>
        );
      }
      case "core/list-item": {
        return (
          <li key={block.id} dangerouslySetInnerHTML={{__html: block.attributes.content}}></li>
        )
      }
      // case "core/html":
      // case "core/table":
      default: {
        return null;
      }
    }
  });
};
