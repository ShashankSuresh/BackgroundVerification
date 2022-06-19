/* eslint-disable prettier/prettier */
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
  color,
} from "styled-system";

const StyledSpan = styled.span`
  ${compose(layout, space, flexbox, position, typography, color)}
  text-transform: ${({ upper }) => (upper ? "uppercase" : "none")};
  font-weight: ${({ thin, bold, mediumbold, semibold, light }) =>
    thin
      ? "var(--light-weight)"
      : bold
      ? "var(--xbold-weight)"
      : mediumbold
      ? "var(--medium-weight)"
      : semibold
      ? "var(--semibold-weight)"
      : light
      ? "var(--light-weight)"
      : "var(--medium-weight)"};
  color: ${({ error, info }) =>
    error ? "var(--red-dark)" : info ? "var(--blue-dark)" : "var(--grey-dark)"};
  font-size: ${({ small, medium, mediumsmall, semilarge, large }) =>
    small
      ? "12px"
      : medium
      ? "16px"
      : mediumsmall
      ? "var(--fs-h6)"
      : semilarge
      ? "26px"
      : large
      ? "var(--fs-tera)"
      : "var(--fs-h5)"};
  opacity: ${({ opacity }) => opacity || 1};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  word-break: ${({ wordbreak }) => (wordbreak ? "break-all" : "normal")};
  line-height: 25px;
`;

const Span = (props) => {
  const { className, children } = props;

  return (
    <StyledSpan className={className} {...props}>
      {children}
    </StyledSpan>
  );
};

Span.propTypes = {
  className: Proptypes.string,
  children: Proptypes.node,
};

export default Span;
