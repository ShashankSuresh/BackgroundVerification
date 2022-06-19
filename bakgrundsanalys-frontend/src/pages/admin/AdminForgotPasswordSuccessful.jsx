import React from "react";
import Proptypes from "prop-types";
import useHistory from "@utils/useHistory";
import { LOGIN } from "@utils/constant";
import ForgotPasswordSuccessfull from "../shared/ForgotPasswordSuccessful";

export const AdminForgotPasswordSuccessful = () => {
  const history = useHistory();
  const handleRedirectToLogin = () => history.push(LOGIN);

  return <ForgotPasswordSuccessfull onClick={handleRedirectToLogin} />;
};

AdminForgotPasswordSuccessful.propTypes = {
  onClick: Proptypes.func,
};

export default AdminForgotPasswordSuccessful;
