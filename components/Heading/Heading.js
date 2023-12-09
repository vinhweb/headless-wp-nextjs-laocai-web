import React from "react";
import { getFontSizeForHeading, getTextAlign } from "../../utils/fonts";

export const Heading = ({ textAlign, content, level }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `font-bold font-heading max-w-5xl mx-auto my-5 leading-tight ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`,
  });
  return tag;
};
