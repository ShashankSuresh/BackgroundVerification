import React from "react";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H4 } from "@components/Heading";
import Span from "@components/Span";

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
      <H4 upper variant="primary">
        {onError ? messages.title_not_found : messages.label_personal_number}
      </H4>
      {!onError && (
        <Div mt={4}>
          <Span textAlign="center">{messages.byline_bankid_register}</Span>
        </Div>
      )}
    </Div>
  );
};

export default ModalHeader;
