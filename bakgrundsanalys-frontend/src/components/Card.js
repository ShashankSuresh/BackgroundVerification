import styled from "styled-components";
import { Card as PRCard } from "primereact/card";
import {
  compose,
  space,
  layout,
  flexbox,
  color,
  typography,
} from "styled-system";

const Card = styled(PRCard)`
  ${compose(layout, space, flexbox, color, typography)};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  .p-card-body {
    padding: 0;
    .p-card-title {
      font-size: var(--fs-h5);
      padding-bottom: 14px;
    }
    .p-card-content {
      padding: 0;
    }
    .p-card-footer {
      padding: 0;
    }
  }
`;

export default Card;
