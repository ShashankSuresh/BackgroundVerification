import React from "react";
import Proptypes from "prop-types";
import { PrimaryButtonIconOutlined } from "@components/Button";
import Icon from "@components/Icon";

const ButtonOutlined = ({ type }) => {
  const { id, label, icon } = type;
  return (
    <PrimaryButtonIconOutlined
      {...type}
      key={id}
      id={id}
      mx={2}
      label={label}
      semibold
      icon={<Icon name={icon} mr={1} />}
    />
  );
};

ButtonOutlined.propTypes = {
  type: Proptypes.object,
};

export default ButtonOutlined;
