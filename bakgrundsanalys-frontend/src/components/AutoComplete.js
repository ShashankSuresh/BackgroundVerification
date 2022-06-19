import { AutoComplete as PRAutocomplete } from "primereact/autocomplete";
import styled from "styled-components";
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

export const AutoComplete = styled(PRAutocomplete)`
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
  .p-inputtext {
    border-radius: ${({ curved }) => (curved ? "10px" : "none")};
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
  }
`;

export default AutoComplete;
