import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import Section from "@components/Section";
import Div from "@components/Div";
import { H2, H3 } from "@components/Heading";
import { default as Span } from "@components/Span";
import { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import Container from "@components/Container";
import { PAGE_NOT_FOUND_CODE, HOME } from "@utils/constant";
import useHistory from "@utils/useHistory";

const StyledSpan = styled(Span)`
  color: var(--blue-dark);
  font-size: var(--fs-text-not-found);
`;

export const PageNotFound = () => {
  const { messages } = useIntl();
  const location = useHistory();

  const handleRedirect = () => {
    location.push(HOME);
  };

  return (
    <Section>
      <Container>
        <Div
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <H3 mb={5} pb={3}>
            {messages.title_error}
          </H3>
          <StyledSpan display="block" mb={5} pb={4}>
            {PAGE_NOT_FOUND_CODE}
          </StyledSpan>
          <H2 mb={4}>{messages.title_page_not_found}</H2>
          <Div
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LinkArrow
              label={messages.label_to_home}
              direction="left"
              onClick={handleRedirect}
              width={1}
            >
              <Icon ml={1} name="headerarrowright" />
            </LinkArrow>
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

export default PageNotFound;
