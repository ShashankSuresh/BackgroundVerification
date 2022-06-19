import { InputSwitch as PRInputSwitch } from "primereact/inputswitch";
import styled from "styled-components";
import { compose, space, layout } from "styled-system";

const Switch = styled(PRInputSwitch)`
  ${compose(layout, space)};
  .p-inputswitch {
    margin-right: 16px;
  }
  .p-inputswitch-slider {
    background: var(--white) !important;
    &:before {
      background: ${({ checked }) =>
        checked ? "var(--blue-dark) !important" : "var(--grey-lightest)"};
    }

    border: 1px solid var(--grey-lightest);
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
    border-radius: 16px;
  }
`;

export default Switch;
