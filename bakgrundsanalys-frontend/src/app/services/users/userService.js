import Axios from "@app/api/axios";
import { USERS } from "@utils/constant";

const usersService = (payload) =>
  Axios.get(`${USERS}?export=1&` + payload).then((response) => response);

export default usersService;
