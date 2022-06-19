import Axios from "@app/api/axios";
import { USERS, RESEND_USER_EMAIL } from "@utils/constant";

const resendInvitation = (userId) =>
  Axios.get(`${USERS}/${userId}/${RESEND_USER_EMAIL}`).then(
    (response) => response
  );

export default resendInvitation;
