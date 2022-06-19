import React from "react";
import Proptypes from "prop-types";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { PrimaryButtonIcon } from "@components/Button";
import { H4 } from "@components/Heading";
import Title from "./Title";
import { LOGIN } from "@utils/constant";
import useHistory from "@utils/useHistory";

const AlertPage = ({ sourcePage }) => {
  const { messages } = useIntl();
  const history = useHistory();
  const redirectToLogin = () => {
    history.push(LOGIN);
  };
  const isForgotPasswordPage = sourcePage === messages.title_forgot_password;
  return (
    <Div display="flex" alignItems="center" flexDirection="column">
      <Title mt={5} titleText={`${messages.label_done}!`} />
      <Div mb={4} pb={2} textAlign="center">
        <H4>
          {isForgotPasswordPage
            ? messages.label_fp_text_done
            : messages.label_rp_text_done}
        </H4>
      </Div>
      <Div mb={4} pb={6}>
        <PrimaryButtonIcon
          rounded
          semibold
          px={"48px"}
          py={2}
          onClick={redirectToLogin}
          label={messages.label_to_login}
        />
      </Div>
    </Div>
  );
};

AlertPage.propTypes = {
  sourcePage: Proptypes.string,
};

export default AlertPage;
