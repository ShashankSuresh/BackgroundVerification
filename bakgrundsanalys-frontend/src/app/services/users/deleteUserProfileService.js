import Axios from "@app/api/axios";
import { USERS, CUSTOMERS } from "@utils/constant";

export const deleteUserProfile = ({ id }) => {
  return Axios.delete(`${USERS}/${id}`).then((response) => response);
};

export const deleteCustomerProfile = ({ customerId }) => {
  return Axios.delete(`${CUSTOMERS}/${customerId}`).then(
    (response) => response
  );
};

export default deleteUserProfile;
