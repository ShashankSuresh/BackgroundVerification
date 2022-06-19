import Axios from "@app/api/axios";
import { INITIALIZE_KLARNA } from "@utils/constant";

const initService = (payload) =>
  Axios.post(INITIALIZE_KLARNA, payload).then((response) => response);

export default initService;
