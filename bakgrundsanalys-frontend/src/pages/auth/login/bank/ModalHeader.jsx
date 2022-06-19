import React from "react";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H3 } from "@components/Heading";
import { Text } from "@components/Text";

export const ModalHeader = (prop) => {
  const { messages } = useIntl();
  const { onError = false } = prop;
  return (
    <Div
      display="flex"
      alignItems="center"
      flexDirection="column"
      mt={3}
      pb={2}
    >
      <H3>
        {onError ? messages.title_not_found : messages.title_bankid_login}
      </H3>
      {!onError && <Text mt={4}>{messages.byline_bankid_login}</Text>}
    </Div>
  );
};

export default ModalHeader;
