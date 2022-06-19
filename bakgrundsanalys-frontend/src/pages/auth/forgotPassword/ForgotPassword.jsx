import React, { useState } from "react";
import Proptypes from "prop-types";
import { useIntl } from "react-intl";
import { Formik } from "formik";
import AlertPage from "@pages/auth/shared/AlertPage";
import Form from "@components/Form";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import InputText from "@components/InputText";
import { H1, H4 } from "@components/Heading";
import { PrimaryButtonIcon } from "@components/Button";
import Link from "@components/Link";
import { INPUT, LOGIN } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import useHistory from "@utils/useHistory";
import ErrorMessage from "../../shared/ErrorMessage";
import forgotPassword from "@app/services/auth/forgotPasswordService";

export const ForgotPassword = () => {
  const { messages } = useIntl();
  const history = useHistory();
  const { EMAIL } = INPUT.NAME;
  const [isMailSubmitted, setIsMailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const redirectToLogin = () => {
    history.push(LOGIN);
  };

  const handleEmailSubmit = async (values) => {
    try {
      await forgotPassword(values);
      setIsMailSubmitted(true);
    } catch (e) {
      setErrorMessage(messages.error);
      throw new Error(e);
    }
  };

  return (
    <>
      <Section pb={"40px !important"}>
        <Container>
          <Div
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {isMailSubmitted && (
              <Div>
                <AlertPage
                  sourcePage={messages.title_forgot_password}
                  redirectToLogin={redirectToLogin}
                />
              </Div>
            )}
            {!isMailSubmitted && (
              <>
                <H1>{messages.title_forgot_password}</H1>
                <Div width={[1, 1, 1 / 2]} display="flex" textAlign="center">
                  <H4 mt={4} lineHeight={1.4}>
                    {messages.label_fp_text}
                  </H4>
                </Div>
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={EmailSchema}
                  onSubmit={handleEmailSubmit}
                >
                  {(prop) => {
                    const { values, handleSubmit, isValid, touched } = prop;
                    return (
                      <Form width={1} pb={3}>
                        <Div
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <InputText
                            curved
                            placeholder={messages.label_email}
                            value={values.email}
                            name={EMAIL}
                            formikProps={prop}
                            label={messages.label_email}
                            width={[1, 1, 1, "350px"]}
                          />
                          {errorMessage && (
                            <Div display="flex" justifyContent="center">
                              <ErrorMessage errorMessage={errorMessage} />
                            </Div>
                          )}
                          <PrimaryButtonIcon
                            rounded
                            semibold
                            onClick={handleSubmit}
                            disabled={
                              !(isValid && Object.keys(touched).length > 0)
                            }
                            label={messages.label_ok}
                            width={["auto"]}
                            minWidth={160}
                            mt={4}
                            py={2}
                            px={5}
                          />
                        </Div>
                      </Form>
                    );
                  }}
                </Formik>
                <Link
                  label={messages.label_back_to_login}
                  onClick={redirectToLogin}
                  direction="left"
                  variant="secondary"
                  mt={2}
                >
                  <i className="icon-headerarrowright"></i>
                </Link>
              </>
            )}
          </Div>
        </Container>
      </Section>
    </>
  );
};

ForgotPassword.propTypes = {
  isAdmin: Proptypes.bool,
};

export default ForgotPassword;
