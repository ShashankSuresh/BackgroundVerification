import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

/**
 * Confirm password validation
 */
const ConfirmPasswordSchema = Yup.object().shape({
  confirm_password: Yup.string()
    .required(
      <FormattedMessage
        id="validation_empty_confirm_password"
        defaultMessage="Enter password"
      />
    )
    .when("password", {
      is: (password) => !!(password && password.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        <FormattedMessage
          id="validation_valid_confirm_password"
          defaultMessage="Password does not match"
        />
      ),
    }),
});

export default ConfirmPasswordSchema;
