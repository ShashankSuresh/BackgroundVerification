import Axios from "@app/api/axios";
import { PERSON_INFORMATION } from "@utils/constant";
import { encodeHTML } from "@utils/utils";

const personInformationSearchService = (payload) => {
  payload = payload.map((obj) =>
    obj.includes("-") ? obj.replace("-", "") : obj
  );
  return Axios.get(PERSON_INFORMATION + encodeHTML(payload, "%")).then(
    (response) => response
  );
};
export default personInformationSearchService;
