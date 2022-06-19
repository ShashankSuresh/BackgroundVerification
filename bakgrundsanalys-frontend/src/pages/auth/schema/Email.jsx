import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

/**
 * Email validation
 */
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email(
      <FormattedMessage
        id="validation_valid_email_input"
        defaultMessage="Invalid email"
      />
    )
    .required(
      <FormattedMessage
        id="validation_empty_email_input"
        defaultMessage="Enter email"
      />
    ),
});

export default EmailSchema;
