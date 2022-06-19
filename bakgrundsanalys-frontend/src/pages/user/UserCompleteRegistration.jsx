import React from "react";
import Axios from "@app/api/axios";
import useHistory from "@utils/useHistory";
import { USER_REGISTRATION_COMPLETED } from "@utils/constant";
import CompleteRegistration from "../auth/shared/CompleteRegistration";

const UserCompleteRegistration = () => {
  const history = useHistory();
  const onClick = (data, params) => {
    const { id = "", token = "" } = params;
    localStorage.setItem("token", token);
    Axios.put(`email/verify/${id}`, data).then(
      () => {
        localStorage.removeItem("token", token);
        history.push(USER_REGISTRATION_COMPLETED);
      },
      (e) => {
        localStorage.removeItem("token", token);
        throw new Error(e);
      }
    );
  };

  return <CompleteRegistration onClick={onClick} />;
};

export default UserCompleteRegistration;
