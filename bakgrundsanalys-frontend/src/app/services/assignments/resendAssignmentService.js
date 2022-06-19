import Axios from "@app/api/axios";
import { ASSIGNMENTS_API, RESEND_ASSIGNMENT_EMAIL } from "@utils/constant";

const resendAssignment = (assignmentId) =>
  Axios.get(
    `${ASSIGNMENTS_API}/${assignmentId}/${RESEND_ASSIGNMENT_EMAIL}`
  ).then((response) => response);

export default resendAssignment;
