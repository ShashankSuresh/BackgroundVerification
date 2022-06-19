import styled from "styled-components";
import { Button as PRButton } from "primereact/button";
import {
  compose,
  width,
  space,
  position,
  layout,
  flexbox,
} from "styled-system";
import breakpoints from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const StyledButton = styled(PRButton)`
  .p-button {
    color: var(--blue-dark);
    cursor: pointer;
    text-decoration: none;
    font-size: var(--fs-link);
    font-weight: var(--semibold-weight);
    line-height: var(--lh-link);
  }
`;

const Button = styled(StyledButton)`
  ${compose(space, position, layout, flexbox, width, layout)};
  box-shadow: none !important;
  background: var(--blue-dark);
  border: var(--blue-dark);
  font-weight: var(--semibold-weight);
  &:hover {
    background: var(--blue-medium) !important;
    border-color: var(--blue-medium);
    color: var(--white) !important;
  }
  &.p-button-link {
    color: var(--blue-dark);
  }
  .p-button {
    &.p-button-link {
      color: var(--blue-dark);
    }
    .p-button-icon-left {
      margin-right: 5px;
    }
    &.icon-style {
      padding: 7px 15px 7px 20px;
    }
  }
  .p-button-label {
    line-height: var(--lh-link);
    font-size: var(--fs-link);
  }
  .p-button {
    &.icon {
      &:hover {
        span {
          &:before {
            color: var(--white) !important;
          }
        }
      }
    }
  }
`;

export const PrimaryButton = styled(Button).attrs({
  className: "p-button-rounded",
})`
  background: ${({ yellow }) =>
    yellow ? "var(--yellow)" : "var(--blue-dark)"};
`;

export const PrimaryButtonOutlined = styled(PrimaryButton).attrs({
  className: "p-button-outlined",
})`
${compose(space, position, layout, flexbox, width, layout)};
justify-content: center;
border: 2px solid var(--blue-dark) !important;
&.p-button-rounded {
  color: var(--blue-dark);
  background-color: var(--white);
  border: 2px solid var(--blue-dark);
  .p-button-label {
    flex: none !important;
    color: var(--blue-dark);
  }
  &:not(a):not(.p-disabled):hover {
    background-color: var(--blue-medium);
    border-color: var(--blue-medium);
    border: 2px solid var(--blue-medium);
    .p-button-label {
      color: var(--white);
    }
  }
`;

export const PrimaryButtonIcon = styled(PrimaryButton)`
  ${compose(space, position, layout, flexbox, width, layout)};
  border-radius: ${({ curved, rounded }) =>
    curved ? "10px" : rounded ? "50px" : "auto"};
  .p-button-label {
    flex: none !important;
  }
  justify-content: center;
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    display: flex;
    justify-content: center;
    .p-button-label {
      flex: none !important;
    }
  }
`;

export const PrimaryButtonIconOutlined = styled(PrimaryButtonOutlined).attrs({
  className: "p-button-outlined icon",
})`
${compose(space, position, layout, flexbox, width, layout)};
  &.p-button-rounded {
    &:not(a):not(.p-disabled):hover {
      i {
        color: var(--white);
      }
  }
`;

export const ButtonLink = styled(Button).attrs({
  className: "p-button-link",
})`
  ${compose(space, position, layout, flexbox, width, layout)};
  &:hover {
    background: transparent !important;
    border-color: transparent;
    color: var(--blue-medium) !important;
  }
`;

export const ButtonLinkIcon = styled(ButtonLink).attrs({
  className: "icon",
})(space, position);

export const ButtonRaised = styled(Button).attrs({
  className: "p-button-raised p-button-text",
})`
  ${compose(space, position, layout, flexbox, width, layout)};
  border-radius: ${({ curved, rounded }) =>
    curved ? "10px" : rounded ? "50px" : "auto"};
  background: var(--white) !important;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%) !important;
`;

export const ButtonRaisedIcon = styled(ButtonRaised)`
${compose(space, position, layout, flexbox, width, layout)};
  &.p-button-text {
    color: var(--blue-dark);
    font-weight: var(--semibold-weight);
  }
  &.p-button-text {
    &:not(a) {
      &:not(.p-disabled) {
        &:hover {
          background: var(--white) !important;
          color: var(--blue-dark) !important;
        }
      }
    }
  }
  .p-button-raised {
    color: var(--blue-dark);
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
      0 1px 5px 0 rgb(0 0 0 / 12%);
});
`;

export const MyProfileButton = styled(ButtonLinkIcon)`
  ${compose(space, position, layout, flexbox, width, layout)};
  .p-button-icon {
    color: var(--turquoise);
    &:before {
      color: var(--turquoise);
    }
  }
  &:hover {
    .p-button-label {
      text-decoration: none !important;
    }
  }
  i {
    color: var(--turquoise);
    padding-left: 8px;
    &:nth-child(1) {
      font-size: var(--fs-h4);
      padding-right: 8px;
      padding-left: 0px;
      color: var(--blue-medium);
    }
  }
`;
