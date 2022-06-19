import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Chips as PRChips } from "primereact/chips";
import { compose, space, color, typography } from "styled-system";
import Div from "@components/Div";

const StyledChips = styled(PRChips)`
  ${compose(space, color, typography)};
  .p-chips-multiple-container {
    padding: 0;
    border: none;
    &:not(.p-disabled) {
      &.p-focus {
        border-color: var(--white);
        box-shadow: none;
      }
    }
    .p-chips-token {
      padding-left: 0px;
      font-size: var(--fs-base);
      background: var(--grey-light);
      display: flex;
      flex-direction: row-reverse;
    }
    .p-chips-token-icon {
      display: none;
    }
  }
`;

const Chips = (props) => {
  const { onRemove, id } = props;
  const customChip = (item) => {
    return (
      <Div py={1} px={2} onClick={onRemove(id)}>
        {`${item}  `}
        &times;
      </Div>
    );
  };
  return <StyledChips {...props} itemTemplate={customChip} />;
};

Chips.propTypes = {
  onRemove: PropTypes.func,
  id: PropTypes.string,
};

export default Chips;
