import Axios from "@app/api/axios";
import { CUSTOMERS } from "@utils/constant";

const editCustomerInfoService = (data) => {
  const { id } = data;

  return Axios.put(`${CUSTOMERS}/${id}`, data).then((response) => response);
};

export default editCustomerInfoService;
