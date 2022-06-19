import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { H2 } from "@components/Heading";
import { TextLargeSemiBoldWeight } from "@components/Text";
import Icon from "@components/Icon";
import Span from "@components/Span";
import Div from "@components/Div";
import { deviationProps } from "./config";

const Deviations = ({ userDetails = {} }) => {
  const { messages } = useIntl();
  const { deviation = {} } = userDetails || {};

  const { sectionTitle, descriptionRight, descriptionLeft, footer } =
    deviationProps;

  const constructDeviations = (arr) => {
    return arr.map((obj, index) => {
      const { label, value } = obj;
      const error = deviation[value];
      return (
        <Div key={index} display="flex" alignItems="center">
          <TextLargeSemiBoldWeight
            px={3}
            py={2}
            mb={3}
            mr={3}
            backgroundColor="var(--turquoise-light)"
            display="block"
            width={[1, "70%"]}
          >
            {messages[label]}
          </TextLargeSemiBoldWeight>
          {error ? (
            <Icon
              name="sign"
              mb={3}
              rounded
              width="36px"
              height="36px"
              bg="var(--red) !important"
              padding="0.4rem !important"
              border="solid var(--red) !important"
            />
          ) : (
            <Icon
              name="mark"
              mb={3}
              width="36px"
              display="flex"
              justifyContent="center"
            />
          )}
        </Div>
      );
    });
  };

  return (
    <Div>
      <H2 color="var(--blue-dark)" mt={4} mb={3} pb={1}>
        {messages[sectionTitle]}
      </H2>
      <Div display="flex" flexDirection={["column", "row"]}>
        <Div width={["100%", "50%"]}>
          {constructDeviations(descriptionRight)}
        </Div>
        <Div width={["100%", "50%"]}>
          {constructDeviations(descriptionLeft)}
        </Div>
      </Div>
      <Span display="block" mt={3}>
        {footer}
      </Span>
    </Div>
  );
};

Deviations.propTypes = {
  userDetails: PropTypes.object,
};

export default Deviations;
