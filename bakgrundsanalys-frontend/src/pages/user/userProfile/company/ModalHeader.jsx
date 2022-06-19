import React from "react";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import Span from "@components/Span";

export const ModalHeader = () => {
  const { messages } = useIntl();
  return (
    <Div display="flex" alignItems="center" flexDirection="column">
      <Span>{messages.label_company_info}</Span>
      <Div mt={3} pt={1}>
        <Span textAlign="center" medium>
          {messages.byline_edit_company_info}
        </Span>
      </Div>
    </Div>
  );
};

export default ModalHeader;
