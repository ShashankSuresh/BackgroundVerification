import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Formik } from "formik";
import queryString from "query-string";
import { H1, H4 } from "@components/Heading";
import Form from "@components/Form";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { PrimaryButtonIcon } from "@components/Button";
import { INPUT, ROUTES } from "@utils/constant";
import AlertPage from "@pages/auth/shared/AlertPage";
import PasswordSchema from "@pages/auth/schema/Password";
import ConfirmPasswordSchema from "@pages/auth/schema/ConfirmPassword";
import resetPassword from "@app/services/auth/resetPasswordService";
import ErrorMessage from "../../shared/ErrorMessage";

const PasswordsSchema = PasswordSchema.concat(ConfirmPasswordSchema);

export const ResetPassword = () => {
  const { messages } = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { search = "" } = location;
  const { PASSWORD, CONFIRM_PASSWORD } = INPUT.NAME;
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const params = queryString.parse(search);
  const [errorMessage, setErrorMessage] = useState("");

  const ResetPasswordSchema = PasswordsSchema.pick([
    PASSWORD,
    CONFIRM_PASSWORD,
  ]);

  const handleTogglePassword = (label) => () => () => {
    if (label === CONFIRM_PASSWORD) {
      setShowConfirmPassword(!showConfirmPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  const handleResetPassword = async (values) => {
    setIsFetching(true);
    const { email = "", token = "" } = params;
    const payload = values;
    payload.email = email;
    payload.token = token;
    try {
      await resetPassword(payload);
      setIsFetching(false);
      setIsSubmitted(true);
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(messages.link_not_valid);
      throw new Error(e);
    }
  };

  const redirectToLogin = () => {
    history.push(ROUTES.LOGIN.URL);
  };

  return (
    <Section>
      <Container>
        {isFetching ? (
          <h1>{messages.text_loading}...</h1>
        ) : (
          <Div
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {isSubmitted && (
              <Div>
                <AlertPage
                  sourcePage={messages.title_set_new_password}
                  redirectToLogin={redirectToLogin}
                />
              </Div>
            )}
            {!isSubmitted && (
              <>
                <H1 display={"block"} pb={"20px"} textAlign="center">
                  {messages.title_set_new_password}
                </H1>
                <H4>{messages.text_new_password}</H4>
                <Formik
                  initialValues={{ password: "", confirm_password: "" }}
                  validationSchema={ResetPasswordSchema}
                  onSubmit={handleResetPassword}
                >
                  {(prop) => {
                    const { values, handleSubmit, isValid, touched } = prop;
                    return (
                      <Form width={1} mt={2}>
                        <Div
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <InputText
                            isPassword
                            curved
                            value={values.password}
                            name={PASSWORD}
                            formikProps={prop}
                            label={`${messages.label_set_password} *`}
                            onTogglePassword={handleTogglePassword(PASSWORD)}
                            showPassword={showPassword}
                            width={[1, "350px"]}
                            placeholder={messages.label_password}
                          />
                          <InputText
                            isPassword
                            curved
                            value={values.confirm_password}
                            name={CONFIRM_PASSWORD}
                            formikProps={prop}
                            label={`${messages.label_repeat_password} *`}
                            onTogglePassword={handleTogglePassword(
                              CONFIRM_PASSWORD
                            )}
                            showPassword={showConfirmPassword}
                            width={[1, "350px"]}
                            placeholder={messages.label_repeat_password}
                          />
                          {errorMessage && (
                            <Div display="flex" justifyContent="center">
                              <ErrorMessage errorMessage={errorMessage} />
                            </Div>
                          )}
                          <Div mt={4}>
                            <PrimaryButtonIcon
                              rounded
                              semibold
                              onClick={handleSubmit}
                              disabled={
                                !(isValid && Object.keys(touched).length > 0)
                              }
                              label={messages.label_save}
                              width={["auto"]}
                              fontSize={"var(--fs-h5)"}
                              py={2}
                              px={5}
                            />
                          </Div>
                        </Div>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}
          </Div>
        )}
      </Container>
    </Section>
  );
};

export default ResetPassword;
