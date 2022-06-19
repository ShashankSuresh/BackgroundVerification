import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import {
  compose,
  space,
  layout,
  flexbox,
  position,
  typography,
  border,
  color,
  shadow,
} from "styled-system";

const StyledDiv = styled.div`
  ${compose(
    layout,
    space,
    flexbox,
    position,
    typography,
    border,
    color,
    shadow
  )};
  white-space: ${({ whiteSpace }) => (whiteSpace ? "nowrap" : "inherit")};
`;

const Div = (props) => {
  const { className, children } = props;

  return (
    <StyledDiv className={className} {...props}>
      {children}
    </StyledDiv>
  );
};

Div.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node,
};

export default Div;
