import Axios from "@app/api/axios";
import { RESETPASSWORD } from "@utils/constant";

const resetPassword = (payload) =>
  Axios.post(RESETPASSWORD, payload).then((response) => response);

export default resetPassword;
