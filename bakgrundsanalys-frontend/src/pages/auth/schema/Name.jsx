import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";

/**
 * Name validation
 */
const NameSchema = Yup.object().shape({
  firstname: Yup.string().required(
    <FormattedMessage id="validation_empty_name" defaultMessage="Enter Name" />
  ),
  lastname: Yup.string().required(
    <FormattedMessage
      id="validation_empty_last_name"
      defaultMessage="Enter Last Name"
    />
  ),
  company_name: Yup.string().required(
    <FormattedMessage
      id="validation_empty_company_name"
      defaultMessage="Enter Company Name"
    />
  ),
  company_address: Yup.string().required(
    <FormattedMessage
      id="validation_empty_company_address"
      defaultMessage="Enter Company Address"
    />
  ),
});

export default NameSchema;
