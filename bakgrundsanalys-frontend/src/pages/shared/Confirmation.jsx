import React from "react";
import Proptypes from "prop-types";
import Div from "@components/Div";
import Section from "@components/Section";
import Container from "@components/Container";
import { H1, H4 } from "@components/Heading";
import { PrimaryButtonIcon } from "@components/Button";

export const EmailConfirmation = ({ title, description, label, onClick }) => {
  return (
    <Section>
      <Container>
        <Div display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <H1 mb={3}>{title}</H1>
          <H4 mb={4} textAlign={"center"}>
            {description}
          </H4>
          <Div>
            <PrimaryButtonIcon
              semibold
              rounded
              label={label}
              onClick={onClick}
              width={["auto"]}
              py={2}
              px={4}
            />
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

EmailConfirmation.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  label: Proptypes.string,
  onClick: Proptypes.func,
};

export default EmailConfirmation;
