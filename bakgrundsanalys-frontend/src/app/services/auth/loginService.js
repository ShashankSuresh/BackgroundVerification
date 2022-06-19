import Axios from "@app/api/axios";
import { AUTH } from "@utils/constant";

const login = (payload) =>
  Axios.post(AUTH, payload).then((response) => response);

export default login;
