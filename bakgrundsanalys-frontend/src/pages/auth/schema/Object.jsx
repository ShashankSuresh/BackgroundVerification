import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

/**
 * Object validation
 */
const ObjectSchema = Yup.object().shape({
  customer: Yup.object().required(
    <FormattedMessage
      id="error_select_customer"
      defaultMessage="Select customer"
    />
  ),
  subUser: Yup.number().required(
    <FormattedMessage
      id="error_select_sub_user"
      defaultMessage="Select a user"
    />
  ),
});

export default ObjectSchema;
