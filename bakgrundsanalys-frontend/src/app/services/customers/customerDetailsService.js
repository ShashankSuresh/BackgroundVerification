import Axios from "@app/api/axios";
import { CUSTOMERS } from "@utils/constant";

const customerDetails = (payload) =>
  Axios.get(`${CUSTOMERS}/${payload}`).then((response) => response);

export default customerDetails;
