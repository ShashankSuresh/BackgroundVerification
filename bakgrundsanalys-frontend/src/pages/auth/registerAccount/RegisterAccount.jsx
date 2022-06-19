import React, { useState } from "react";
import Proptypes from "prop-types";
import { useIntl } from "react-intl";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { H1, H4 } from "@components/Heading";
import { Text, TextMediumWeight } from "@components/Text";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import Tabs from "@components/Tabs";
import NewOrExistingAccount from "@pages/auth/shared/NewOrExistingAccount";
import RegisterAccountForm from "./RegisterAccountForm";
import registrationService from "@app/services/auth/registrationService";
import { INDIVIDUAL, COMPANY, ROUTES } from "@utils/constant";
import ErrorMessage from "@pages/shared/ErrorMessage";

export const RegisterAccount = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { messages } = useIntl();
  const location = useHistory();
  const { search = "" } = useLocation();
  const { customer_id: customerId = "" } = queryString.parse(search);
  const { isCreateCustomer = false } = props;
  const handleRegistrationSubmit = async (data) => {
    try {
      setIsFetching(true);
      const type = activeIndex === 0 ? INDIVIDUAL : COMPANY;

      let payload = {
        type: type,
        ...data,
      };
      if (customerId) {
        payload = { ...payload, customer_id: customerId };
      }
      const response = await registrationService(payload);

      const { data: { customer = {} } = {} } = response;
      const { id = "" } = customer || {};
      setIsFetching(false);

      isCreateCustomer
        ? location.push(`${ROUTES.CUSTOMER_DETAILS.URL}?id=${id}`)
        : location.push(ROUTES.REGISTRATION_SUCCESSFUL.URL);
    } catch (e) {
      setIsFetching(false);
      setErrorMessage(messages.error);
      throw new Error(e);
    }
  };

  const tabContent = [
    {
      title: messages.title_private_person,
      content: (
        <RegisterAccountForm
          isUser
          handleRegistrationSubmit={handleRegistrationSubmit}
          errorMessage={errorMessage}
          {...props}
        />
      ),
    },
    {
      title: messages.title_company,
      content: (
        <RegisterAccountForm
          isCompany
          handleRegistrationSubmit={handleRegistrationSubmit}
          errorMessage={errorMessage}
          {...props}
        />
      ),
    },
  ];

  const onTabChange = (e) => setActiveIndex(e.index);

  return isFetching ? (
    <h1>{messages.text_loading}</h1>
  ) : (
    <>
      <Section
        px={"10px !important"}
        py={`${isCreateCustomer}? "0 !important": ""`}
      >
        <Container>
          <Div>
            {!isCreateCustomer && (
              <Div
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <H1>{messages.title_registration}</H1>
                <H4 my={4}>{messages.label_registration}</H4>
              </Div>
            )}
            <ErrorMessage />
            <Tabs
              content={tabContent}
              onTabChange={onTabChange}
              activeIndex={activeIndex}
            />
            {!isCreateCustomer && (
              <>
                <Div pb={3} textAlign="center">
                  <Text>{messages.label_bank_registration_message}</Text>
                </Div>
                <Div py={2} textAlign="center">
                  <TextMediumWeight>
                    {messages.label_registration_message}
                  </TextMediumWeight>
                </Div>
              </>
            )}
          </Div>
        </Container>
      </Section>
      {!isCreateCustomer && <NewOrExistingAccount isNew={false} />}
    </>
  );
};

RegisterAccount.propTypes = {
  isAdmin: Proptypes.bool,
  isCreateCustomer: Proptypes.bool,
};

export default RegisterAccount;
