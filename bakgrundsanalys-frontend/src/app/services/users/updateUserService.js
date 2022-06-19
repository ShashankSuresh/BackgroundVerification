import Axios from "@app/api/axios";
import { USERS } from "@utils/constant";

const updateUser = (data, isSubUser = false, id = "", isActiveUser = false) => {
  const {
    role = "",
    email = "",
    firstname = "",
    lastname = "",
    phone = "",
    permissions = {},
    customerId = "",
  } = data;
  let payload = {};
  if (!isSubUser) {
    payload = {
      role,
      email,
      type: "admin",
    };
    if (isActiveUser) {
      payload.firstname = firstname;
      payload.lastname = lastname;
      if (phone) {
        payload.phone = phone;
      }
    }
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
    if (isActiveUser) {
      payload.firstname = firstname;
      payload.lastname = lastname;
      if (phone) {
        payload.phone = phone;
      }
    }

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
  return Axios.put(`${USERS}/${id}`, payload).then((response) => response);
};

export default updateUser;
