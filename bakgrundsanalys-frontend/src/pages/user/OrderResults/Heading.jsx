import React from "react";
import { useIntl } from "react-intl";
import { H3, H1 } from "@components/Heading";
import Div from "@components/Div";
import { TextMediumWeight } from "@components/Text";
import { headingProps } from "./config";

const Heading = () => {
  const { messages } = useIntl();
  const { title, subTitle, description } = headingProps;
  return (
    <>
      <Div
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={60}
      >
        <Div>
          <H3 color="var(--blue-dark)" mb={4}>
            {messages[title]}
          </H3>
          <H1>{messages[subTitle]}</H1>
        </Div>
      </Div>
      <Div p={3} bg="var(--yellow-light)" display="block">
        <TextMediumWeight>{messages[description]}</TextMediumWeight>
      </Div>
    </>
  );
};

export default Heading;
