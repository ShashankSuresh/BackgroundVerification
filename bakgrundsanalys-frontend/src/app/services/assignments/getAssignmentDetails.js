import Axios from "@app/api/axios";

const assignmentDetails = (payload) =>
  Axios.get(`assignments/${payload}`).then((response) => response);

export default assignmentDetails;
