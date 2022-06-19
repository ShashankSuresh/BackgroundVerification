import styled from "styled-components";
import { InputTextarea as PRInputTextarea } from "primereact/inputtextarea";
import {
  compose,
  layout,
  space,
  flexbox,
  position,
  typography,
  color,
  border,
  width,
} from "styled-system";

export const InputTextArea = styled(PRInputTextarea).attrs({
  className: "p-inputtextarea p-inputtext",
})`
  ${compose(layout, space, flexbox, position, typography, color, border, width)}
  border-color: var(--turquoise);
  border-radius: ${({ curved }) => (curved ? "10px" : "none")};
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
  ::placeholder {
    font-family: "Noto Sans Display", sans-serif;
  }
`;
export default InputTextArea;
