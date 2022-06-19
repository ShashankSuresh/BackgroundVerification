import React from "react";
import Proptypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import Container from "@components/Container";
import Section from "@components/Section";
import Div from "@components/Div";
import { H2 } from "@components/Heading";
import Icon from "@components/Icon";
import { LinkArrow } from "@components/Link";
import { ROUTES } from "@utils/constant";

const NewOrExistingAccount = ({ isNew = true }) => {
  const { messages } = useIntl();
  const history = useHistory();

  const handleRedirect = () => {
    isNew
      ? history.push(ROUTES.REGISTER_ACCOUNT.URL)
      : history.push(ROUTES.LOGIN.URL);
  };

  return (
    <Section
      backgroundColor={"rgba(var(--grey-lightest-rgba), 0.4)"}
      px={"10px !important"}
      py={50}
    >
      <Container>
        <Div
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Div width={[1]}>
            <H2 display={"block"}>
              {isNew
                ? messages.label_register_text
                : messages.label_existing_user}
            </H2>
          </Div>
          <Div mt={3} pt={1}>
            <LinkArrow
              label={
                !isNew
                  ? messages.label_to_login_page
                  : messages.label_create_account
              }
              onClick={handleRedirect}
              direction="left"
              variant="secondary"
            >
              <Icon ml={1} name="headerarrowright" />
            </LinkArrow>
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

NewOrExistingAccount.propTypes = {
  isNew: Proptypes.bool,
};

export default NewOrExistingAccount;
