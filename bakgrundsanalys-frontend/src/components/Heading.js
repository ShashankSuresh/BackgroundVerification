import styled from "styled-components";
import { compose, space, display, flexbox } from "styled-system";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

export const H1 = styled("h1")`
  ${compose(space, display)};
  font-size: var(--fs-h1);
  font-weight: var(--semibold-weight);
  color: var(--blue-dark);
  line-height: var(--lh-h1);
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    font-size: var(--fs-h1-m);
    line-height: var(--lh-h1-m);
  }
`;

export const H2 = styled("h2")`
  ${compose(space, display)};
  font-size: var(--fs-h2);
  font-weight: var(--semibold-weight);
  line-height: var(--lh-h2);
  color: var(--grey-dark);
`;

export const H3 = styled("h3")`
  ${compose(space, display)};
  font-size: var(--fs-h3);
  font-weight: var(--semibold-weight);
  line-height: var(--lh-h3);
  color: var(--grey-dark);
  text-transform: uppercase;
`;

export const H4 = styled("h4")`
  ${compose(space, display, flexbox)};
  font-size: var(--fs-h4);
  font-weight: var(--medium-weight);
  line-height: var(--lh-h4);
  color: var(--grey-dark);
`;

export const H5 = styled("h5")`
  ${compose(space, display)};
  font-size: var(--fs-h5);
  font-weight: var(--medium-weight);
  line-height: var(--lh-h5);
  color: var(--grey-dark);
`;

export const Error = styled(H4)`
  ${compose(space, display)};
  color: var(--red-dark);
`;

export const ErrorLight = styled(H4)`
  ${compose(space, display)};
  color: var(--red);
`;
