import Axios from "@app/api/axios";
import { SERVICES } from "@utils/constant";

const services = () => Axios.get(SERVICES).then((response) => response);

export default services;
