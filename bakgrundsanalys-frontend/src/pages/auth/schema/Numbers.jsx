import React from "react";
import { FormattedMessage } from "react-intl";
import * as Yup from "yup";
import Luhn from "luhn";
import { SVLANG } from "@utils/constant";

/**
 * Phone validation
 */
const NumbersSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+?\d+$/, SVLANG.validation_valid_vat_number)
    .required(
      <FormattedMessage
        id="validation_empty_phone_number"
        defaultMessage="Enter Phone number"
      />
    )
    .test(
      "test-length",
      SVLANG.validation_valid_phone_number,
      (phone) => String(phone).length > 6 && String(phone).length < 14
    ),
  registration_nr: Yup.string()
    .matches(/^[0-9-]+$/, SVLANG.validation_valid_company_number)
    .test(
      "test-number",
      SVLANG.validation_valid_company_number,
      (value) =>
        Luhn.validate(value && value.replace("-", "")) &&
        value &&
        value.length === 11
    )
    .required(
      <FormattedMessage
        id="validation_empty_company_number"
        defaultMessage="Enter Company number"
      />
    ),
  tax_nr: Yup.string()
    .required(
      <FormattedMessage
        id="validation_empty_vat_number"
        defaultMessage="Enter Vat number"
      />
    )
    .test(
      "check-vat",
      <FormattedMessage
        id="validation_valid_vat_number"
        defaultMessage="Invalid Vat number"
      />,
      (companyVat) => companyVat && companyVat.length === 14
    ),
});

export default NumbersSchema;
