import React from "react";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H3 } from "@components/Heading";
import { Text } from "@components/Text";

export const ModalHeader = (prop) => {
  const { messages } = useIntl();
  const { editType } = prop;
  const getTitleAndByline = () => {
    switch (editType) {
      case "user":
        return { title: messages.title_edit_user_info };
      case "password":
        return { title: messages.label_change_password };
      case "personalNumber":
        return {
          title: messages.label_personal_number,
          byline: messages.byline_edit_personal_number,
        };
      case "deleteProfile":
        return { title: messages.label_delete_account };
      default:
        return { title: "Info" };
    }
  };

  const { title = "", byline = "" } = getTitleAndByline(editType);

  return (
    <Div display="flex" alignItems="center" flexDirection="column" mt={2}>
      <H3>{title}</H3>
      {byline && (
        <Div mt={4}>
          <Text>{byline}</Text>
        </Div>
      )}
    </Div>
  );
};

export default ModalHeader;
