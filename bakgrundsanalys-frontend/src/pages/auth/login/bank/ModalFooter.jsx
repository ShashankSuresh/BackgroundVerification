import React from "react";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { PrimaryButtonIconOutlined } from "@components/Button";

export const ModalFooter = (prop) => {
  const { messages } = useIntl();
  const { onCancelClick } = prop;
  return (
    <Div display="flex" justifyContent="center">
      <PrimaryButtonIconOutlined
        rounded
        semibold
        label={messages.label_cancel}
        onClick={onCancelClick}
        px={40}
        py={"6px"}
      />
    </Div>
  );
};

export default ModalFooter;
