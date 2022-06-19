import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import { useHistory } from "react-router-dom";
import Confirmation from "@pages/shared/Confirmation";
import { ROUTES } from "@utils/constant";

export const EmailConfirmation = (props) => {
  const { messages } = useIntl();
  const history = useHistory();
  const handleRedirectToLogin = () => {
    history.push(ROUTES.LOGIN.URL);
  };
  const {
    title = messages.title_registration_complete,
    description = messages.lable_can_login_description,
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

EmailConfirmation.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  label: Proptypes.string,
  onClick: Proptypes.func,
};

export default EmailConfirmation;
