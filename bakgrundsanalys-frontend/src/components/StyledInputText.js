import styled from "styled-components";
import { InputText as PRInputText } from "primereact/inputtext";
import {
  compose,
  space,
  layout,
  flexbox,
  position,
  typography,
  color,
  border,
  width,
} from "styled-system";

export const StyledInputText = styled(PRInputText)`
  ${compose(
    layout,
    space,
    flexbox,
    position,
    typography,
    color,
    border,
    width
  )};
  border-radius: ${({ curved }) => (curved ? "10px" : "none")};
  padding-left: ${({ curved }) => (curved ? "0.5rem" : "1rem")};
  border-color: ${({ error }) =>
    error ? "var(--red-dark)" : "var(--turquoise)"};
  &:enabled {
    &:focus {
      box-shadow: 0 0 0 0.2rem var(--white);
      border-color: var(--turquoise);
    }
    &:hover {
      border-color: var(--turquoise);
      box-shadow: none;
    }
  }
`;

export default StyledInputText;
