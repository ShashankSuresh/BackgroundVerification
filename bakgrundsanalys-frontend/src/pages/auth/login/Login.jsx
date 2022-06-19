import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { H1 } from "@components/Heading";
import Form from "@components/Form";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import Icon from "@components/Icon";
import InputText from "@components/InputText";
import { PrimaryButtonIcon } from "@components/Button";
import { LinkArrow } from "@components/Link";
import { INPUT, DASHBOARD_COMPANY, COMPANY, CUSTOMER } from "@utils/constant";
import EmailSchema from "@pages/auth/schema/Email";
import PasswordSchema from "@pages/auth/schema/Password";
import useHistory from "@utils/useHistory";
import login from "@app/services/auth/loginService";
import { TextMediumWeight } from "@components/Text";
import { authActions } from "@app/reducers/authReducer";
import ErrorMessage from "../../shared/ErrorMessage";
import { getRedirectPage } from "@utils/utils";

const CredentialsSchema = EmailSchema.concat(PasswordSchema);

export const Login = () => {
  const dispatch = useDispatch();
  const { messages } = useIntl();
  const location = useHistory();
  const { EMAIL, PASSWORD } = INPUT.NAME;
  const { TEXT } = INPUT.TYPE;
  const [showPassword, setShowPassword] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const LoginSchema = CredentialsSchema.pick([EMAIL, PASSWORD]);

  const handleTogglePassword = () => () => {
    setShowPassword(!showPassword);
  };

  const isTokenValid = (token) => {
    return token !== null;
  };

  const redirectToPage = (user) => {
    const redirectPage = getRedirectPage(user);
    return location.push(redirectPage);
  };

  const handleLoginSubmit = async (values) => {
    try {
      setIsFetching(true);
      const response = await login({
        email: values.email,
        password: values.password,
      });
      const { token, user } = response.data || {};
      const userType = user.type ? user.type : user.customer.type;
      if (isTokenValid(token)) {
        localStorage.setItem("token", token);
        dispatch(authActions.storeUserInfo(user));
        if (userType === CUSTOMER && user.customer.type === COMPANY) {
          location.push(DASHBOARD_COMPANY);
        } else {
          redirectToPage(user);
        }
        setIsFetching(false);
        return;
      }
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(messages.error);
    }
  };

  const redirectToForgotPassword = () => location.push("FORGOT_PASSWORD");

  return (
    <>
      {isFetching ? (
        <h1>{messages.text_loading}...</h1>
      ) : (
        <Section>
          <Container>
            <Div
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <H1 display={"block"}>{messages.login}</H1>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={handleLoginSubmit}
              >
                {(prop) => {
                  const { values, handleSubmit, isValid, touched } = prop;
                  return (
                    <Form width={1}>
                      <Div
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <InputText
                          curved
                          placeholder={messages.label_name}
                          value={values.email}
                          name={EMAIL}
                          formikProps={prop}
                          label={
                            <TextMediumWeight>
                              {messages.label_email}
                            </TextMediumWeight>
                          }
                          width={[1, "350px"]}
                        />
                        <InputText
                          isPassword
                          curved
                          placeholder={messages.label_password}
                          value={values.password}
                          name={PASSWORD}
                          formikProps={prop}
                          label={messages.label_password}
                          type={showPassword ? PASSWORD : TEXT}
                          onTogglePassword={handleTogglePassword}
                          showPassword={showPassword}
                          width={[1, "350px"]}
                        />
                        {errorMessage && (
                          <Div display="flex" justifyContent="center">
                            <ErrorMessage errorMessage={errorMessage} />
                          </Div>
                        )}
                        <LinkArrow
                          label={messages.title_forgot_password}
                          onClick={redirectToForgotPassword}
                          direction="left"
                          my={3}
                        >
                          <Icon ml={1} name="headerarrowright" />
                        </LinkArrow>
                        <PrimaryButtonIcon
                          rounded
                          semibold
                          onClick={handleSubmit}
                          disabled={
                            !(isValid && Object.keys(touched).length > 0)
                          }
                          label={messages.login}
                          width={["auto"]}
                          fontSize={"var(--fs-h5)"}
                          py={2}
                          px={5}
                        />
                      </Div>
                    </Form>
                  );
                }}
              </Formik>
            </Div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default Login;
