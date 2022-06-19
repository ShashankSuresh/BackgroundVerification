import React from "react";
import Proptypes from "prop-types";
import Div from "@components/Div";
import RegisterUserForm from "./RegisterUserForm";

const RegisterAccountForm = (props) => {
  const { isCompany = false, isUser = true, handleRegistrationSubmit } = props;

  return (
    <Div
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Div width={1}>
        <RegisterUserForm
          isUser={isUser}
          isCompany={isCompany}
          onRegistrationSubmit={handleRegistrationSubmit}
          {...props}
        />
      </Div>
    </Div>
  );
};

RegisterAccountForm.propTypes = {
  isAdmin: Proptypes.bool,
  isCompany: Proptypes.bool,
  isUser: Proptypes.bool,
  handleRegistrationSubmit: Proptypes.func,
};

export default RegisterAccountForm;
