import Axios from "@app/api/axios";
import { FORGOTPASSWORD } from "@utils/constant";

const forgotPassword = (payload) =>
  Axios.post(FORGOTPASSWORD, payload).then((response) => response);

export default forgotPassword;
