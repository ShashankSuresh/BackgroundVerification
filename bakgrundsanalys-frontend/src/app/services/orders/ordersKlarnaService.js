import Axios from "@app/api/axios";
import { ORDERS_KLARNA } from "@utils/constant";

const ordersKlarnaService = (payload) =>
  Axios.get(`${ORDERS_KLARNA}/${payload}`).then((response) => response);

export default ordersKlarnaService;
