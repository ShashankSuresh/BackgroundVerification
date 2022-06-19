import Axios from "@app/api/axios";

const updateAssignment = (payload) => {
  const { id = "", comments = "", user = {}, status = "" } = payload;
  const { value: userId = "" } = user || {};
  const data = {
    user_id: userId,
    status: status,
  };
  if (comments) {
    data.comment = comments;
  }

  return Axios.put(`assignments/${id}`, data).then((response) => response);
};
export default updateAssignment;
