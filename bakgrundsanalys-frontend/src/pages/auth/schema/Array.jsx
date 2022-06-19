import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

/**
 * Array validation
 */
const ArraySchema = Yup.object().shape({
  services: Yup.array()
    .required(
      <FormattedMessage
        id="error_select_services"
        defaultMessage="Select service"
      />
    )
    .min(
      1,
      <FormattedMessage
        id="error_select_services"
        defaultMessage="Select service"
      />
    ),
});

export default ArraySchema;
