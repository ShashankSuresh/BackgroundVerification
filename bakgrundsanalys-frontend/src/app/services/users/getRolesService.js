import Axios from "@app/api/axios";
import { ROLES } from "@utils/constant";

const getAvailableRoles = (payload = "") =>
  Axios.get(`${ROLES}?type=${payload}`).then((response) => {
    const { data: { data: roles = [] } = {} } = response;
    const res = roles.map((obj) => {
      const { name = "", permissions = [] } = obj;
      const rights = {};
      permissions.map((obj) => {
        const { name = "" } = obj;
        if (name.includes("write")) {
          rights[name.split("write-")[1]] = "write";
        }
        if (name.includes("read")) {
          rights[name.split("read-")[1]] = "read";
        }
      });
      return { value: name, permissions: rights };
    });
    return res;
  });

export default getAvailableRoles;
