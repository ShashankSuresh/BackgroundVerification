import styled from "styled-components";
import { Checkbox as PRCheckbox } from "primereact/checkbox";
import { compose, color, layout, space } from "styled-system";

const Checkbox = styled(PRCheckbox).attrs({
  type: "checkbox",
  icon: "icon-tickmark",
})`
box-shadow: none !important;
  ${compose(layout, space, color)};
  .p-checkbox {
    box-shadow: none !important;
  }
  .p-checkbox-box {
    border-radius: 5px;
    border: ${({ input }) =>
      input ? "1.5px solid var(--grey)" : "2px solid var(--turquoise)"};
    &: hover {
        border-color: ${({ input }) =>
          input ? "var(--grey) !important" : "var(--turquoise) !important"};
  }
  } {
    .p-checkbox-box {
      &.p-highlight {
        border-color: ${({ input }) =>
          input ? "var(--grey)" : "var(--turquoise)"};
        background: ${({ input }) =>
          input ? "transparent !important" : "var(--turquoise) !important"};
        &: hover {
        border-color: ${({ input }) =>
          input ? "var(--grey)" : "var(--turquoise)"};
        background: ${({ input }) =>
          input ? "transparent" : "var(--turquoise)"};
      }
      &.p-focus {
        border-color:${({ input }) =>
          input ? "var(--grey)" : "var(--turquoise)"};
      }
    }
  }
  .p-checkbox-icon {
    border-radius: 4px;
    color: ${({ input }) =>
      input ? "var(--blue-dark) !important" : "var(--white) !important"};
    background-color:${({ input }) =>
      input ? "transparent" : "var(--turquoise)"};
    &: hover {
        border-color: ${({ input }) =>
          input ? "var(--blue-dark)" : "var(--turquoise)"};
  }
  
`;

export default Checkbox;
