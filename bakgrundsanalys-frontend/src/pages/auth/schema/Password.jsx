import * as Yup from "yup";
import { SVLANG } from "@utils/constant";
/**
 * Password validation
 * A valid password must contain atleast
 * one uppercase, one lowercase, one number and one special case character
 * with minimum of 8 digits.
 */
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, SVLANG.validation_length_password_input)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      SVLANG.validation_valid_password_input
    )
    .required(SVLANG.validation_empty_password_input),
  current_password: Yup.string()
    .min(8, SVLANG.validation_length_password_input)
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      SVLANG.validation_valid_password_input
    )
    .required(SVLANG.validation_empty_password_input),
});

export default PasswordSchema;
