import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { compose, space, position, layout } from "styled-system";

const StyledCountTag = styled("span")`
  ${compose(space, position, layout)};
  background: var(--yellow);
  color: var(--dark-grey);
  font-size: var(--fs-milli);
  border-radius: 5px;
  font-weight: var(--medium-weight);
`;

const CountTag = ({ count }) => (
  <StyledCountTag px={2} py={1}>
    {count}
  </StyledCountTag>
);

export const EllipseIcon = styled(StyledCountTag)`
  ${compose(space, position, layout)};
  border-radius: 50%;
  width: 77px;
  height: 75px;
  background: var(--turquoise);
  padding: 9px 25px;
  text-align: center;
`;

CountTag.propTypes = {
  count: PropTypes.number,
};

export default CountTag;
