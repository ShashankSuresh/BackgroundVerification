import Axios from "@app/api/axios";
import { CUSTOMERS } from "@utils/constant";

const customerService = () =>
  Axios.get(`${CUSTOMERS}?export=1&`).then((response) => response);

export default customerService;
