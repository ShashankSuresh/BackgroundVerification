import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { PrimaryButton, PrimaryButtonOutlined } from "@components/Button";
import Div from "@components/Div";
import { useHistory } from "react-router-dom";
import Container from "@components/Container";
import Section from "@components/Section";
import { H2 } from "@components/Heading";
import { ROUTES } from "@utils/constant";
import { isAuthenticated } from "@utils/utils";

const ProfileCreation = () => {
  const { messages } = useIntl();
  const history = useHistory();

  const isAuthenticatedFlag = isAuthenticated();

  const handleRedirectToSearch = () => history.push(ROUTES.SEARCH.URL);

  const { order = {} } = useSelector((state) => state.klarnaReducer.ordersInfo);

  const handleRedirectToRegisteration = () => {
    const { customer_id: customerId = "" } = order;
    history.push(`${ROUTES.REGISTER_ACCOUNT.URL}?customer_id=${customerId}`);
  };

  return (
    <Section
      backgroundColor={"rgba(var(--grey-lightest-rgba), .4)"}
      width={1}
      m={"0 auto"}
      px={[3, 4]}
      py={5}
      className="profile-creation"
    >
      <Container>
        <H2>{messages.create_profile_heading}</H2>
        <Div mt={4}>
          <PrimaryButtonOutlined
            width={[1, "auto"]}
            minWidth={185}
            py={2}
            mr={[0, 4]}
            mb={[4, 0]}
            label={messages.make_new_order}
            onClick={handleRedirectToSearch}
          />
          {!isAuthenticatedFlag && (
            <PrimaryButton
              width={[1, "auto"]}
              minWidth={165}
              py={2}
              label={messages.create_profile}
              onClick={handleRedirectToRegisteration}
            />
          )}
        </Div>
      </Container>
    </Section>
  );
};

export default ProfileCreation;
