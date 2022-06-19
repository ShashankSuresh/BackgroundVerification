import styled from "styled-components";
import { Dropdown as PRDropdown } from "primereact/dropdown";
import {
  compose,
  width,
  position,
  space,
  layout,
  flexbox,
} from "styled-system";

const Dropdown = styled(PRDropdown)`
  ${compose(width, position, space, layout, flexbox)} {
    border-color: var(--turquoise);
    border-radius: 10px;
    line-height: normal;
    :not(.p-disabled) {
      :hover {
        border-color: var(--turquoise);
      }
      &.p-focus {
        box-shadow: 0 0 0 3.2px var(--white);
      }
    }
    .p-dropdown-label {
      color: var(--grey-dark);
      font-weight: var(--medium-weight);
      &.p-placeholder {
        color: var(--grey);
        padding: 8px;
      }
    }
    .p-dropdown-trigger {
      color: var(--turquoise);
    }
    .pi-chevron-down:before {
      content: "\\e913";
      font-size: var(--fs-icon-s);
    }
  }
`;

export default Dropdown;
