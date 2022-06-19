import React from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import Span from "@components/Span";
import Icon from "@components/Icon";
import { ButtonLinkIcon } from "@components/Button";
import { ROUTES } from "@utils/constant";

export const BankLoginError = () => {
  const { messages } = useIntl();
  const history = useHistory();

  const handleRedirect = () => {
    history.push(ROUTES.REGISTER_ACCOUNT.URL);
  };

  return (
    <Div
      width="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Span medium my={2}>
        {messages.byline_bankid_login_error}
      </Span>
      <Div pt={1}>
        <ButtonLinkIcon
          semibold
          label={messages.label_create_account}
          iconPos="right"
          icon={<Icon name="headerarrowright" />}
          onClick={handleRedirect}
        />
      </Div>
    </Div>
  );
};

export default BankLoginError;
