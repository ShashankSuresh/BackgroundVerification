import Axios from "@app/api/axios";
import { REPORTS } from "@utils/constant";

const getResults = (reportId) =>
  Axios.get(`${REPORTS}/${reportId}`).then((response) => response);

export default getResults;
