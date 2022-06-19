import Axios from "@app/api/axios";
// import { CUSTOMERS } from "@utils/constant";

const fileUploadService = (payload) =>
  Axios.post("files", payload).then((response) => response);

export default fileUploadService;
