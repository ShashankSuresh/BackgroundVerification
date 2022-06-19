import Axios from "@app/api/axios";
import config from "@src/config";

const configureAxios = () => {
  Axios.defaults.baseURL = config.BASE_URL;
  Axios.defaults.headers.get["Accept"] = "application/json";
  Axios.defaults.headers.post["Accept"] = "application/json";
  Axios.defaults.headers.put["Accept"] = "application/json";

  Axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
};
export default configureAxios;
