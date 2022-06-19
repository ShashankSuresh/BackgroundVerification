import React from "react";
import Proptypes from "prop-types";
import Icon from "@components/Icon";
import Link from "@components/Link";
import { TextMediumWeight } from "@components/Text";

const UtilsLink = ({ type }) => {
  const { id, label, icon, onClick = () => {}, iconSize = "" } = type;
  return (
    <TextMediumWeight>
      <Link {...type} key={id} label={label} onClick={onClick}>
        <Icon name={icon} mx={1} fontSize={iconSize} />
      </Link>
    </TextMediumWeight>
  );
};

UtilsLink.propTypes = {
  type: Proptypes.object,
};

export default UtilsLink;
