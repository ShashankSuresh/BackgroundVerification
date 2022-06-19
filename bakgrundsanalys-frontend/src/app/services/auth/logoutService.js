import Axios from "@app/api/axios";
import { AUTH } from "@utils/constant";

const logoutService = (payload) =>
  Axios.delete(AUTH, { data: payload }).then((response) => response);

export default logoutService;
