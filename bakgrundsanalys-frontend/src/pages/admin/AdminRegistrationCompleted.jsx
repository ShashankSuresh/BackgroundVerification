import React from "react";
import useHistory from "@utils/useHistory";
import { LOGIN } from "@utils/constant";
import RegistrationSuccessful from "../shared/RegistrationCompleted";

const AdminRegistrationCompleted = () => {
  const location = useHistory();
  const handleRedirectToLogin = () => location.push(LOGIN);

  return <RegistrationSuccessful onClick={handleRedirectToLogin} />;
};

export default AdminRegistrationCompleted;
