import React from "react";
import * as Yup from "yup";
import { FormattedMessage } from "react-intl";

const VatNumberSchema = Yup.object().shape({
  tax_nr: Yup.string().test(
    "check-vat",

    <FormattedMessage
      id="validation_valid_vat_number"
      defaultMessage="Invalid Vat number"
    />,
    (companyVat) =>
      companyVat === undefined ||
      String(companyVat).length === 14 ||
      String(companyVat).length === 0
  ),
});

export default VatNumberSchema;
