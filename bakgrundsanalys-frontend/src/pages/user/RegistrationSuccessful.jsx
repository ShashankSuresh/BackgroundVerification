import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import Confirmation from "@pages/shared/Confirmation";

export const RegistrationSuccessful = (props) => {
  const { messages } = useIntl();
  const {
    title = messages.label_almost_done,
    description = messages.text_email_verification_description,
    label = messages.label_to_login_page,
    onClick = props.handleRedirectToLogin,
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

RegistrationSuccessful.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  label: Proptypes.string,
  onClick: Proptypes.func,
  handleRedirectToLogin: Proptypes.func,
};

export default RegistrationSuccessful;
