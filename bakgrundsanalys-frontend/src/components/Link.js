/* eslint-disable prettier/prettier */
import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import {
  layout,
  compose,
  space,
  flexbox,
  width,
  position,
} from "styled-system";
import Div from "@components/Div";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const StyledLink = styled.a`
  ${compose(layout, space, flexbox, width, position)};
  color: var(--blue-dark);
  cursor: pointer;
  text-decoration: none;
  font-size: var(--fs-link);
  font-weight: var(--semibold-weight);
  line-height: var(--lh-link);
  i {
    display: flex;
    align-self: center;
    color: ${({ darkblue }) =>
      darkblue ? "var(--blue-dark)" : "var(--turquoise)"};
  }
  &:hover {
    color: var(--blue-medium);
  }

  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    font-size: var(--fs-link-m);
    line-height: var(--lh-link-m);
  }
`;

function Link(props) {
  const { href, label, children, iconPos = "right" } = props;

  const ContentBasedOnDirection = () => (
    <Div display="flex" flexDirection={"row"} {...props} alignItems={"center"}>
      {iconPos === "left" && children}
      {label}
      {iconPos === "right" && children}
    </Div>
  );

  return (
    <StyledLink href={href} {...props}>
      <ContentBasedOnDirection />
    </StyledLink>
  );
}
export const LinkArrow = styled(Link)`
  &:hover {
    i {
      transform: translateX(5px);
    }
  }
`;

Link.propTypes = {
  href: Proptypes.string,
  label: Proptypes.string,
  children: Proptypes.node,
  iconPos: Proptypes.string,
};

export default Link;
