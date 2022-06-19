import React, { useState } from "react";
import Proptypes from "prop-types";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useIntl } from "react-intl";
import { H1, H2, H4 } from "@components/Heading";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import { PrimaryButtonIcon } from "@components/Button";
import InvertedIcon from "@components/Icon";

import { Formik } from "formik";
import Form from "@components/Form";
import InputText from "@components/InputText";
import { INPUT } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import PasswordSchema from "@pages/auth/schema/Password";
import NameSchema from "@pages/auth/schema/Name";
import NumbersSchema from "@pages/auth/schema/Numbers";
import ConfirmPasswordSchema from "@pages/auth/schema/ConfirmPassword";

const RegistrationSchema = EmailSchema.concat(PasswordSchema)
  .concat(NameSchema)
  .concat(NumbersSchema)
  .concat(ConfirmPasswordSchema);

export const CompleteRegistration = (props) => {
  const { EMAIL, PASSWORD, CONFIRM_PASSWORD, NAME, LAST_NAME, PHONE } =
    INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const { messages } = useIntl();
  const location = useLocation();
  const { search = "" } = location;
  const params = queryString.parse(search);

  const formFields = [
    EMAIL,
    PASSWORD,
    CONFIRM_PASSWORD,
    NAME,
    LAST_NAME,
    PHONE,
  ];
  const handleRegistrationSubmit = (data) => props.onClick(data, params);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleTogglePassword = (label) => () => () => {
    if (label === CONFIRM_PASSWORD) {
      setShowConfirmPassword(!showConfirmPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  return (
    <Section px={"10px !important"}>
      <Container>
        <Div textAlign={"center"}>
          <H1>{messages.title_complete_registration}</H1>
          <H4 display="block" my={3} py={1} maxWidth={"500px"} mx={"auto"}>
            {messages.description_complete_registration}
          </H4>
          <Formik
            initialValues={{
              firstname: "",
              lastname: "",
              email: params.email || "",
              phone: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={RegistrationSchema.pick(formFields)}
            onSubmit={handleRegistrationSubmit}
          >
            {(prop) => {
              const { values, isValid, touched, handleSubmit } = prop;
              return (
                <>
                  <Div pt={2} width={1} textAlign={"center"}>
                    <H2 mb={3}>{messages.label_your_login}:</H2>
                    <H4>{values.email}</H4>
                    <H2 mt={4}>{messages.title_user_info}:</H2>
                  </Div>
                  <Form>
                    <Div
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      pt={2}
                      pb={1}
                    >
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
                        placeholder={messages.placeholder_phone}
                        value={values.phone}
                        name={PHONE}
                        formikProps={prop}
                        label={messages.label_phone}
                        width={[1, "350px"]}
                        medium
                        maxLength={13}
                      />
                      <InputText
                        isPassword
                        curved
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
                        value={values.confirm_password}
                        name={CONFIRM_PASSWORD}
                        formikProps={prop}
                        label={`${messages.label_repeat_password} *`}
                        width={[1, "350px"]}
                        medium
                        onTogglePassword={handleTogglePassword(
                          CONFIRM_PASSWORD
                        )}
                        showPassword={showConfirmPassword}
                      />
                    </Div>
                    <Div
                      display={["block", "flex"]}
                      justifyContent="center"
                      textAlign="center"
                      my={4}
                      py={2}
                    >
                      <Div mb={[4, 0]}>
                        <PrimaryButtonIcon
                          rounded
                          semibold
                          py={2}
                          px={3}
                          icon={
                            <InvertedIcon
                              py={0}
                              pr={2}
                              pl={0}
                              rounded={true}
                              name="tickmark"
                            />
                          }
                          onClick={handleSubmit}
                          disabled={
                            !(isValid && Object.keys(touched).length > 0)
                          }
                          label={messages.create_profile}
                        />
                      </Div>
                    </Div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </Div>
      </Container>
    </Section>
  );
};

CompleteRegistration.propTypes = {
  onClick: Proptypes.func,
};

export default CompleteRegistration;
