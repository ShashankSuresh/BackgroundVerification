import Axios from "@app/api/axios";
import { ORDERS } from "@utils/constant";

const ordersAdminService = (payload) =>
  Axios.post(ORDERS.toLowerCase(), payload).then((response) => response);

export default ordersAdminService;
