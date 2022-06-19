import React from "react";
import Proptypes from "prop-types";
import Span from "@components/Span";
import { H1 } from "@components/Heading";

const Title = ({ titleText, bylineText = "" }) => {
  return (
    <>
      <H1 mb={20}>{titleText}</H1>
      {bylineText && (
        <Span textAlign="center" display="block">
          {bylineText}
        </Span>
      )}
    </>
  );
};

Title.propTypes = {
  titleText: Proptypes.string,
  bylineText: Proptypes.string,
};

export default Title;
