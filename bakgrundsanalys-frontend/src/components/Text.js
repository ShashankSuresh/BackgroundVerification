import styled from "styled-components";
import { compose, space, display, layout, color } from "styled-system";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

export const TextLarge = styled("span")`
  ${compose(space, display, layout)};
  color: var(--grey-dark);
  font-weight: var(--light-weight);
  font-size: var(--fs-text);
  line-height: var(--lh-text);
  text-decoration: ${({ textDecoration }) => textDecoration};
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    font-size: var(--fs-text-m);
    line-height: var(--lh-text-m);
  }
`;
TextLarge.defaultProps = {
  textDecoration: "none",
};

export const TextLargeSemiBoldWeight = styled(TextLarge)`
  ${compose(space, display, color)};
  color: var(--grey-dark);
  font-weight: var(--semibold-weight);
  font-size: var(--fs-text);
  line-height: var(--lh-text);
`;

export const Text = styled("span")`
  ${compose(space, display, color)};
  color: var(--grey-dark);
  font-weight: var(--light-weight);
  font-size: var(--fs-text-secondary);
  line-height: var(--lh-text-secondary);
  word-break: ${({ wordBreak }) => wordBreak};
`;

Text.defaultProps = {
  wordBreak: "normal",
};

export const TextUpperCase = styled(Text)`
  ${compose(space, display)};
  text-transform: uppercase;
  font-weight: var(--medium-weight);
`;

export const TextMediumWeight = styled(Text)`
  ${compose(space, display)};
  font-weight: var(--medium-weight);
  color: ${({ error }) => (error ? "var(--red-dark)" : "")};
`;

export const EllipseIconText = styled(Text)`
  ${compose(space, display)};
  font-size: var(--fs-icon-number);
  font-weight: var(--semibold-weight);
  line-height: var(--lh-icon);
  color: var(--white);
`;

export const ColouredSemiBoldText = styled(TextLargeSemiBoldWeight)`
  ${compose(space, display, color)};
`;
