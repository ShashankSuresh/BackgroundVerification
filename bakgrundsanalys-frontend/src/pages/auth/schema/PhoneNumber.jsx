import * as Yup from "yup";
import { SVLANG } from "@utils/constant";

const PhoneNumberSchema = Yup.object().shape({
  phone: Yup.number()
    .typeError(SVLANG.validation_valid_phone_number)
    .test("test-length", SVLANG.validation_valid_phone_number, (phone) => {
      return (
        phone === undefined ||
        String(phone).length === 10 ||
        String(phone).length === 0
      );
    }),
});

export default PhoneNumberSchema;
