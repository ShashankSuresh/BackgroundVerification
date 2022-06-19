import React from "react";
import Proptypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import {
  compose,
  space,
  color,
  typography,
  border,
  layout,
  flexbox,
} from "styled-system";

const StyledIcon = styled.i.attrs((props) => ({
  className: props.rounded
    ? classNames("rounded", `icon-${props.name}`)
    : `icon-${props.name}`,
}))`
  ${compose(space, color, typography, border, layout, flexbox)}
`;

export const InvertedIcon = styled(StyledIcon).attrs({
  className: "invert-rounded",
})``;

export const Ellipse24Icon = styled(StyledIcon)`
  ${compose(space, color, typography, border)};
  background-color: var(--turquoise);
  padding: 9px 28px 9px 28px;
  border-radius: 50%;
`;

const Icon = (props) => <StyledIcon {...props} />;

Icon.propTypes = {
  rounded: Proptypes.bool,
  name: Proptypes.string,
};

Icon.defaultProps = {
  rounded: false,
};

export default Icon;
