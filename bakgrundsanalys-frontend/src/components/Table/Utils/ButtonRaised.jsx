import React from "react";
import Proptypes from "prop-types";
import styled from "styled-components";
import { ButtonRaisedIcon } from "@components/Button";
import Icon from "@components/Icon";

const ButtonRaisedIconCustom = styled(ButtonRaisedIcon)`
  i {
    color: ${({ id }) => (id === "filter" ? "" : "var(--turquoise)")};
    transform: ${({ id }) => (id === "filter" ? "" : "rotate(90deg)")};
  }
`;

const ButtonRaised = ({ type }) => {
  const { id, label, icon } = type;
  return (
    <ButtonRaisedIconCustom
      {...type}
      key={id}
      id={id}
      mx={2}
      label={label}
      /* padding top condition is done for "SCV" button style */
      icon={<Icon name={icon} pt={`${label ? "10px" : ""}`} />}
    />
  );
};

ButtonRaised.propTypes = {
  type: Proptypes.object,
};

export default ButtonRaised;
