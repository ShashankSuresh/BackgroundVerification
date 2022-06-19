import { compose, space, display, layout } from "styled-system";
import styled from "styled-components";

const Label = styled("label")`
  ${compose(space, display, layout)};
  font-size: var(--fs-h4);
  font-weight: var(--medium-weight);
  line-height: var(--lh-h4);
  color: var(--grey-dark);
`;

export default Label;
