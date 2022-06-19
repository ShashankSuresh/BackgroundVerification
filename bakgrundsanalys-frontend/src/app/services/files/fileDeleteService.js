import Axios from "@app/api/axios";
// import { CUSTOMERS } from "@utils/constant";

const fileDeleteService = (payload) =>
  Axios.delete(`files/${payload}`).then((response) => response);

export default fileDeleteService;
