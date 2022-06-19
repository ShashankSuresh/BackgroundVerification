import React from "react";
import Proptypes from "prop-types";
import { PrimaryButton } from "@components/Button";
import Icon from "@components/Icon";

const Button = ({ type }) => {
  const { id, label, icon } = type;
  return (
    <PrimaryButton
      {...type}
      semibold
      key={id}
      id={id}
      mx={2}
      label={label}
      icon={icon ? <Icon name={icon} mr={2} /> : ""}
      px={25}
      py={20}
    />
  );
};

Button.propTypes = {
  type: Proptypes.object,
  headerActionsFunctions: Proptypes.array,
};

export default Button;
