import Axios from "@app/api/axios";
import { CUSTOMERS, COMPANY } from "@utils/constant";

const registrationService = (payload) => {
  const getPayloadBasedOnType = (payload) => {
    if (payload.type === COMPANY) {
      return payload;
    } else {
      const {
        email,
        firstname,
        lastname,
        phone,
        type,
        password,
        confirm_password,
      } = payload;
      return {
        email,
        firstname,
        lastname,
        phone,
        type,
        password,
        confirm_password,
      };
    }
  };
  const data = getPayloadBasedOnType(payload);

  if (payload && payload.customer_id) {
    data.customer_id = payload.customer_id;
  }
  return Axios.post(CUSTOMERS, data).then((response) => response);
};

export default registrationService;
