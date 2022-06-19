import React, { useState } from "react";
import Proptypes from "prop-types";
import { useIntl } from "react-intl";
import { Formik } from "formik";
import Form from "@components/Form";
import Div from "@components/Div";
import { H2 } from "@components/Heading";
import { InvertedIcon } from "@components/Icon";
import InputText from "@components/InputText";
import {
  PrimaryButtonIcon,
  PrimaryButtonIconOutlined,
} from "@components/Button";
import { INPUT } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import PasswordSchema from "@pages/auth/schema/Password";
import NameSchema from "@pages/auth/schema/Name";
import NumbersSchema from "@pages/auth/schema/Numbers";
import ConfirmPasswordSchema from "@pages/auth/schema/ConfirmPassword";
import useHistory from "@utils/useHistory";
import { REGISTER_WITH_BANKID } from "@utils/constant";
import ErrorMessage from "@pages/shared/ErrorMessage";

const RegistrationSchema = EmailSchema.concat(PasswordSchema)
  .concat(NameSchema)
  .concat(NumbersSchema)
  .concat(ConfirmPasswordSchema);

const RegisterUserForm = (props) => {
  const { messages } = useIntl();
  const history = useHistory();

  const handleRedirect = () => {
    history.push(REGISTER_WITH_BANKID);
  };

  const {
    EMAIL,
    PASSWORD,
    CONFIRM_PASSWORD,
    NAME,
    LAST_NAME,
    PHONE,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_VAT,
  } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const {
    isCompany = false,
    onRegistrationSubmit,
    isCreateCustomer,
    onCancelCreate,
    errorMessage,
  } = props;
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const userDetails = [
    EMAIL,
    PASSWORD,
    CONFIRM_PASSWORD,
    NAME,
    LAST_NAME,
    PHONE,
  ];
  const companyDetails = [COMPANY_NAME, COMPANY_NUMBER, COMPANY_VAT];

  const handleTogglePassword = (label) => () => () => {
    if (label === CONFIRM_PASSWORD) {
      setShowConfirmPassword(!showConfirmPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };
  const regFormDetails = userDetails.concat(companyDetails);

  return (
    <Div>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          confirm_password: "",
          company_name: "",
          registration_nr: "",
          tax_nr: "",
        }}
        validationSchema={
          isCompany
            ? RegistrationSchema.pick(regFormDetails)
            : RegistrationSchema.pick(userDetails)
        }
        onSubmit={onRegistrationSubmit}
      >
        {(prop) => {
          const { values, handleSubmit, isValid, touched } = prop;
          return (
            <Form>
              <Div
                display="flex"
                flexDirection="column"
                alignItems="center"
                pt={40}
                pb={1}
              >
                <H2>{messages.label_account_info}</H2>
                <InputText
                  curved
                  placeholder={messages.label_name}
                  value={values.firstname}
                  name={NAME}
                  type={TEXT}
                  formikProps={prop}
                  label={`${messages.label_name} *`}
                  width={[1, "350px"]}
                  medium
                />
                <InputText
                  curved
                  placeholder={messages.label_last_name}
                  value={values.lastname}
                  name={LAST_NAME}
                  type={TEXT}
                  formikProps={prop}
                  label={`${messages.label_last_name} *`}
                  width={[1, "350px"]}
                  medium
                />
                <InputText
                  curved
                  placeholder={messages.label_email}
                  value={values.email}
                  name={EMAIL}
                  formikProps={prop}
                  label={`${messages.label_email} *`}
                  width={[1, "350px"]}
                  medium
                />
                <InputText
                  curved
                  placeholder={"+46 ..."}
                  value={values.phone}
                  name={PHONE}
                  formikProps={prop}
                  label={`${messages.label_phone} *`}
                  width={[1, "350px"]}
                  medium
                  maxLength={13}
                />
                <InputText
                  isPassword
                  curved
                  placeholder={messages.label_password}
                  value={values.password}
                  name={PASSWORD}
                  formikProps={prop}
                  label={`${messages.label_set_password} *`}
                  width={[1, "350px"]}
                  medium
                  onTogglePassword={handleTogglePassword(PASSWORD)}
                  showPassword={showPassword}
                />
                <InputText
                  isPassword
                  curved
                  placeholder={messages.label_password}
                  value={values.confirm_password}
                  name={CONFIRM_PASSWORD}
                  formikProps={prop}
                  label={`${messages.label_repeat_password} *`}
                  width={[1, "350px"]}
                  medium
                  onTogglePassword={handleTogglePassword(CONFIRM_PASSWORD)}
                  showPassword={showConfirmPassword}
                />
              </Div>
              {isCompany && (
                <>
                  <Div
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt={4}
                  >
                    <H2>{messages.label_company_info}</H2>
                    <InputText
                      curved
                      placeholder={messages.label_company_name}
                      value={values.company_name}
                      name={COMPANY_NAME}
                      formikProps={prop}
                      type={TEXT}
                      label={`${messages.label_company_name} *`}
                      width={[1, "350px"]}
                      medium
                    />
                    <InputText
                      curved
                      placeholder={messages.label_company_number}
                      value={values.registration_nr}
                      name={COMPANY_NUMBER}
                      formikProps={prop}
                      label={`${messages.label_company_number} *`}
                      width={[1, "350px"]}
                      medium
                      maxLength={11}
                    />
                    <InputText
                      curved
                      placeholder={messages.label_company_vat}
                      value={values.tax_nr}
                      name={COMPANY_VAT}
                      formikProps={prop}
                      label={`${messages.label_company_vat} *`}
                      width={[1, "350px"]}
                      medium
                      onKeyPress={onkeypress}
                      maxLength={14}
                    />
                  </Div>
                </>
              )}
              {errorMessage && (
                <Div display="flex" justifyContent="center">
                  <ErrorMessage errorMessage={errorMessage} />
                </Div>
              )}
              <Div
                display={["block", "block", "block", "flex"]}
                justifyContent="center"
                textAlign="center"
                my={4}
                py={2}
              >
                <Div
                  mr={[0, 0, 0, 4]}
                  mb={[4, 4, 4, 0]}
                  display="flex"
                  justifyContent="center"
                >
                  <PrimaryButtonIcon
                    rounded
                    semibold
                    py={1}
                    px={"23px"}
                    icon={
                      <InvertedIcon
                        p={1}
                        mr={1}
                        rounded={true}
                        name="tickmark"
                      />
                    }
                    onClick={handleSubmit}
                    disabled={!(isValid && Object.keys(touched).length > 0)}
                    label={
                      isCreateCustomer
                        ? messages.title_create_customer
                        : messages.label_register
                    }
                  />
                </Div>
                <Div display="flex" justifyContent="center">
                  {!isCreateCustomer ? (
                    <PrimaryButtonIcon
                      rounded
                      semibold
                      py={2}
                      px={4}
                      icon="icon-qrcode"
                      label={messages.title_bankid_Register}
                      type={"button"}
                      onClick={handleRedirect}
                      disabled={!(isValid && Object.keys(touched).length > 0)}
                    />
                  ) : (
                    <PrimaryButtonIconOutlined
                      rounded
                      semibold
                      label={messages.label_cancel}
                      onClick={onCancelCreate}
                      px={40}
                      py={1}
                      fontSize={"var(--fs-h5)"}
                    />
                  )}
                </Div>
              </Div>
            </Form>
          );
        }}
      </Formik>
    </Div>
  );
};

RegisterUserForm.propTypes = {
  isCompany: Proptypes.bool,
  onRegistrationSubmit: Proptypes.func,
  errorMessage: Proptypes.bool,
  isCreateCustomer: Proptypes.func,
  onCancelCreate: Proptypes.func,
};

export default RegisterUserForm;
