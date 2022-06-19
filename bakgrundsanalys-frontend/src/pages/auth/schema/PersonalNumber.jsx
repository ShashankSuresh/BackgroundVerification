import * as Yup from "yup";
import { SVLANG } from "@utils/constant";

/* Personal number validation using luhn algorithm*/

const NumberSchema = Yup.object().shape({
  personal_number: Yup.string()
    .required(SVLANG.error_enter_id)
    .test(
      "test-number",
      SVLANG.error_invalid_id,
      (value) => value && value.replace("-", "").length === 12
    ),
});

export default NumberSchema;
