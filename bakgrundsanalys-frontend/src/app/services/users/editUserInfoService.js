import Axios from "@app/api/axios";
import { USERS } from "@utils/constant";

const editUserInfo = (payload) => {
  const { id, type } = payload;
  const getPayloadBasedOnType = () => {
    switch (type) {
      case "user": {
        const { firstname, lastname, email, phone } = payload;
        return { firstname, lastname, email, phone };
      }
      case "personalNumber": {
        const { personal_number } = payload;
        return { personal_number };
      }
      case "password": {
        const { password, confirm_password, old_password } = payload;
        return { password, confirm_password, old_password };
      }
      default:
        return "";
    }
  };
  return Axios.put(`${USERS}/${id}`, getPayloadBasedOnType(type)).then(
    (response) => response
  );
};

export default editUserInfo;
