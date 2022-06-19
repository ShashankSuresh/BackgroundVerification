import React from "react";
import styled from "styled-components";
import { Dialog as PRDialog } from "primereact/dialog";
import { compose, space, layout, flexbox } from "styled-system";

const StyledDialog = styled(PRDialog)`
  ${compose(space, flexbox, layout)};
  .pi {
    font-size: var(--fs-h4);
  }
  .p-dialog-header {
    padding-bottom: 0px;
  }
  .p-dialog-header-icons {
    position: relative;
    .p-dialog-header-icon {
      &.p-dialog-header-close {
        &.p-link {
          position: absolute;
          right: -19px;
          top: -17px;
        }
      }
    }
    .p-dialog-header-icon {
      &:focus {
        box-shadow: none !important;
      }
    }
    .p-dialog-header-icon:enabled {
      &:hover {
        color: var(--grey) !important;
        border-color: inherit !important;
        background: none !important;
      }
    }
  }
  .p-dialog {
    .p-dialog-header {
      padding-bottom: 16px;
    }
  }
  .p-dialog-footer {
    padding-bottom: 32px !important;
  }
`;

const Dialog = (props) => {
  return <StyledDialog {...props} />;
};

export default Dialog;
