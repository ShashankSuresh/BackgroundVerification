import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Formik, Form as FormikForm } from "formik";
import { H2, H4 } from "@components/Heading";
import Div from "@components/Div";
import Label from "@components/Label";
import InputText from "@components/InputText";
import Checkbox from "@components/Checkbox";
import { INPUT } from "@utils/constant";
import { renderSnippet, isAuthenticated } from "@utils/utils";
import EmailSchema from "@pages/auth/schema/Email";
import VatNumberSchema from "@pages/auth/schema/VatNumber";
import PaymentOption from "./PaymentOption";

const SingleOrderSummary = (prop) => {
  const isAuthenticatedFlag = isAuthenticated();
  const { isFreeAccount } = prop;
  const { messages } = useIntl();
  const [html, setHTML] = useState("");
  const [checked, setChecked] = useState(false);

  const { EMAIL, COMPANY_VAT } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;

  const InfoSchema = EmailSchema.concat(VatNumberSchema.pick([COMPANY_VAT]));

  const htmlSnippet = (val) => setHTML(val.html_snippet);

  return (
    <Div my={4}>
      {!isAuthenticatedFlag ? (
        <>
          <Div>
            <H2>{messages.title_about_you}</H2>
          </Div>
          <H4 mt={3}>{messages.message_email_notification}</H4>
          <Formik
            enableReinitialize
            initialValues={{ email: "", tax_nr: "" }}
            validationSchema={InfoSchema}
          >
            {(formik) => {
              const { touched, isValid, values } = formik;
              return (
                <FormikForm>
                  <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <InputText
                      curved
                      placeholder={messages.label_email}
                      value={values.email}
                      name={EMAIL}
                      formikProps={formik}
                      type={TEXT}
                      label={messages.label_email}
                      labelAlignment="left"
                      width={[1, 1, 1, "540px"]}
                    />
                    <Div mt={4}>
                      <Checkbox
                        inputId="companycheckbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.checked)}
                      />
                      <Label htmlFor="companycheckbox" ml={10}>
                        {messages.message_checkbox_text}
                      </Label>
                    </Div>
                    {!!checked && (
                      <>
                        <Div mt={4}>
                          <Label>{messages.text_moms_included}</Label>
                        </Div>
                        <InputText
                          curved
                          placeholder={messages.label_company_vat}
                          value={values.tax_nr}
                          name={COMPANY_VAT}
                          formikProps={formik}
                          label={messages.label_company_vat}
                          labelAlignment="left"
                          width={[1, 1, 1, "540px"]}
                          medium
                          onKeyPress={onkeypress}
                          maxLength={14}
                        />
                      </>
                    )}
                  </Div>
                  <Div mt={4}>
                    <PaymentOption
                      disabled={!(isValid && Object.keys(touched).length > 0)}
                      guestUserProps={{
                        email: values.email,
                        tax_nr: values.tax_nr,
                      }}
                      htmlSnippet={htmlSnippet}
                      isFreeAccount={isFreeAccount}
                    />
                  </Div>
                </FormikForm>
              );
            }}
          </Formik>
        </>
      ) : (
        <Div mt={4}>
          <PaymentOption
            htmlSnippet={htmlSnippet}
            isFreeAccount={isFreeAccount}
          />
        </Div>
      )}
      <Div mt={5} id="my-checkout-container">
        {!!html.length && renderSnippet(html)}
      </Div>
    </Div>
  );
};

export default SingleOrderSummary;
