import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import useHistory from "@utils/useHistory";
import { LOGIN } from "@utils/constant";
import Confirmation from "@pages/shared/Confirmation";

export const ForgotPasswordSuccessfull = (props) => {
  const { messages } = useIntl();
  const history = useHistory();

  const handleRedirectToLogin = () => history.push(LOGIN);

  const {
    title = `${messages.label_done}!`,
    description = messages.label_fp_text_done,
    label = messages.label_to_login_page,
    onClick = handleRedirectToLogin,
  } = props;

  return (
    <Confirmation
      title={title}
      description={description}
      label={label}
      onClick={onClick}
    />
  );
};

ForgotPasswordSuccessfull.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  label: Proptypes.string,
  onClick: Proptypes.func,
  handleRedirectToLogin: Proptypes.func,
};

export default ForgotPasswordSuccessfull;
