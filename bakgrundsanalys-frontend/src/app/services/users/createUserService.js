import Axios from "@app/api/axios";
import { USERS } from "@utils/constant";

const createUser = (payload) => {
  const {
    customer_id,
    email,
    firstname,
    lastname,
    phone,
    type,
    password,
    confirm_password,
  } = payload;

  const payloadForUser = {
    customer_id,
    email,
    firstname,
    lastname,
    phone,
    type,
    password,
    confirm_password,
  };

  return Axios.post(USERS, payloadForUser).then((response) => response);
};

export default createUser;
