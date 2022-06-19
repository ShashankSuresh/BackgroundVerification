import React from "react";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import Span from "@components/Span";
import Link from "@components/Link";
import { ROUTES } from "@utils/constant";

export const BankRegisterError = () => {
  const { messages } = useIntl();
  const history = useHistory();

  const handleRedirect = () => {
    history.push(ROUTES.REGISTER_ACCOUNT.URL);
  };

  return (
    <Div
      maxWidth="400px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Span medium my={2}>
        {messages.byline_bankid_login_error}
      </Span>
      <Div mt={3}>
        <Link
          display={["block", "flex"]}
          label={messages.label_create_account}
          onClick={handleRedirect}
          direction="left"
          variant="secondary"
          mr={2}
        >
          <i className="icon-headerarrowright"></i>
        </Link>
      </Div>
    </Div>
  );
};

export default BankRegisterError;
