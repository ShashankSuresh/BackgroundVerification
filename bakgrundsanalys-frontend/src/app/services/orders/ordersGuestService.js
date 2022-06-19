import Axios from "@app/api/axios";
import { ORDERS_GUEST } from "@utils/constant";

const ordersGuestService = (payload) =>
  Axios.post(ORDERS_GUEST.toLowerCase(), payload).then((response) => response);

export default ordersGuestService;
