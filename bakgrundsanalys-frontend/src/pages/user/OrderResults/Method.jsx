import React from "react";
import { useIntl } from "react-intl";
import { H2 } from "@components/Heading";
import Div from "@components/Div";
import { methodProps } from "./config";
import { TextLarge } from "@components/Text";

const Method = () => {
  const { messages } = useIntl();
  const { sectionTitle, description } = methodProps;

  const constructDescription = (arr) =>
    arr.map((value, index) => (
      <TextLarge key={index} display="block" pb={3}>
        {value}
      </TextLarge>
    ));

  return (
    <Div>
      <H2 color="var(--blue-dark)" mt={4} mb={3}>
        {messages[sectionTitle]}
      </H2>
      {constructDescription(description)}
    </Div>
  );
};

export default Method;
