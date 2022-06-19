import React from "react";
import Proptypes from "prop-types";
import { H4 } from "@components/Heading";

const SubTitle = ({ type }) => {
  const { label } = type;
  return <H4 {...type}>{label}</H4>;
};

SubTitle.propTypes = {
  type: Proptypes.object,
};

export default SubTitle;
