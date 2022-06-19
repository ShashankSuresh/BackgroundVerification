import React from "react";
import Proptypes from "prop-types";
import NewOrExistingAccount from "../auth/shared/NewOrExistingAccount";
import ForgotPasswordSuccessfull from "../shared/ForgotPasswordSuccessful";

export const UserForgotPasswordSuccessful = () => {
  const handleRedirectToLogin = () => {
    //
  };

  return (
    <>
      <ForgotPasswordSuccessfull
        handleRedirectToLogin={handleRedirectToLogin}
      />
      <NewOrExistingAccount />
    </>
  );
};

UserForgotPasswordSuccessful.propTypes = {
  onClick: Proptypes.func,
};

export default UserForgotPasswordSuccessful;
