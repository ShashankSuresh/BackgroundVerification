import Axios from "@app/api/axios";
import { USERS } from "@utils/constant";

const inviteUser = (data, isSubUser = false) => {
  const { role = "", email = "", permissions = {}, customerId = "" } = data;
  let payload = {};
  if (!isSubUser) {
    payload = {
      role,
      email,
      type: "admin",
    };
    if (role === "admin-custom") {
      const rights = [];
      Object.entries(permissions).map((obj) => {
        if (obj[1]) {
          rights.push(`${obj[1]}-${obj[0]}`);
        }
      });
      payload.permissions = rights;
    }
  } else {
    payload = {
      role,
      email,
      type: "customer",
      customer_id: customerId,
    };
    if (role === "custom") {
      const rights = [];
      Object.entries(permissions).map((obj) => {
        if (obj[1]) {
          rights.push(`${obj[1]}-${obj[0]}`);
        }
      });
      payload.permissions = rights;
    }
  }
  return Axios.post(USERS, payload).then((response) => response);
};

export default inviteUser;
