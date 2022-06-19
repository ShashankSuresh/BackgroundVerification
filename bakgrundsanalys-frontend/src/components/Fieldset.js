import styled from "styled-components";
import { Fieldset as PRFieldset } from "primereact/fieldset";
import {
  compose,
  space,
  layout,
  flexbox,
  color,
  typography,
} from "styled-system";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const Fieldset = styled(PRFieldset)`
  ${compose(space, flexbox, layout, color, typography)};
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  .p-fieldset-content {
    padding: 0px;
  }
  i.icon {
    border-radius: 50%;
  }
  .p-fieldset-legend {
    border: none;
    background: var(--white);
    padding: 0;
    margin-left: 20px;
    border-radius: 50%;
  }
  ul {
    li {
      &::before {
        content: "";
      }
    }
  }
`;

const FieldsetCustom = styled(Fieldset)`
  position: relative;
  i.icon {
    color: #fff;
    background-color: #223c77;
    padding: 16px;
    font-size: 24px;
    border-radius: 50%;
  }
  .p-fieldset-content {
    padding: 0;
  }
  .p-fieldset-legend-text {
    position: absolute;
    left: -34px;
    top: 28px;
  }
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    .p-fieldset-content {
      padding-left: 0;
    }
    .p-fieldset-legend-text {
      position: inherit;
      left: 0;
      top: 0;
    }
  }
`;

export { Fieldset, FieldsetCustom };
