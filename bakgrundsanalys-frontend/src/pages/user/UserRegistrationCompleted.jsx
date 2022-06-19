import React, { useEffect } from "react";
import Axios from "@app/api/axios";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import RegistrationSuccessful from "../shared/RegistrationCompleted";

const UserRegistrationCompleted = () => {
  const location = useLocation();
  const { search = "" } = location;
  const params = queryString.parse(search);

  useEffect(() => {
    const { id = "", token = "" } = params;
    if (id || token) {
      localStorage.setItem("token", token);
      Axios.put(`email/verify/${id}`).then(
        () => {
          localStorage.removeItem("token", token);
        },
        (e) => {
          localStorage.removeItem("token", token);
          throw new Error(e);
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RegistrationSuccessful />;
};

export default UserRegistrationCompleted;
