import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import Div from "./Div";
import { breakpoints } from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const StyledDiv = styled(Div)`
  max-width: 1140px;
  margin: 0 auto;
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    width: 100%;
    margin: 0;
  }
`;

const Container = (props) => <StyledDiv {...props} />;

Container.propTypes = {
  className: Proptypes.string,
};

export default Container;
