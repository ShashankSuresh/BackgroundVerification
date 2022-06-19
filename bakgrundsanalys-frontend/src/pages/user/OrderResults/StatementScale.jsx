import React from "react";
import { useIntl } from "react-intl";
import { H2 } from "@components/Heading";
import {
  TextLarge,
  TextLargeSemiBoldWeight,
  TextMediumWeight,
  Text,
} from "@components/Text";
import Div from "@components/Div";
import { statementScaleProps } from "./config";

const StatementScale = () => {
  const { messages } = useIntl();
  const { sectionTitle, description, grad, footer } = statementScaleProps;

  const constructGrads = (arr) =>
    arr.map((value, index) => (
      <Div key={index} display="flex" mb={3}>
        <Div
          display="block"
          width={20}
          minHeight={[
            "-webkit-fill-available",
            "-webkit-fill-available",
            "-webkit-fill-available",
            90,
          ]}
          py={45}
          px={"12px"}
          bg={`var(--${value.bgColor}-dark)`}
        />
        <Div display={["block", "block", "block", "flex"]}>
          <Div
            display="flex"
            mb={[3, 3, 3, 0]}
            mx={3}
            px={22}
            width={[1, 1, 1, 130]}
            backgroundColor={"var(--turquoise-light)"}
            alignItems="center"
          >
            <TextLargeSemiBoldWeight
              width={[1 / 2, 1 / 2, 1 / 2, 1]}
              textAlign="center"
            >
              {messages[value.title]} {value.grades}
            </TextLargeSemiBoldWeight>
            <TextMediumWeight
              py={3}
              px={2}
              mx={3}
              height={["auto", "auto", "auto", 90]}
              width={[1 / 2, 1 / 2, 1 / 2, 100]}
              display={["block", "block", "block", "none"]}
            >
              {value.values.map((val, key) => (
                <Text key={key}>{val}</Text>
              ))}
            </TextMediumWeight>
          </Div>
          <Div
            display="flex"
            flexDirection="column"
            backgroundColor={"var(--turquoise-light)"}
            justifyContent="flex-start"
            mb={[3, 3, 3, 0]}
            ml={[20, 20, 20, 0]}
            mr={30}
            py={18}
            px={10}
            width={[1, 1, 1, 1 / 3]}
          >
            <TextMediumWeight>
              {messages[value.description.title]}
            </TextMediumWeight>
            <Text>{messages[value.description.description]}</Text>
          </Div>
          <Div
            mr={3}
            backgroundColor={"var(--turquoise-light)"}
            height={120}
            minWidth={150}
            display={["none", "none", "none", "flex"]}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {value.values.map((val, key) => (
              <TextMediumWeight key={key}>{val}</TextMediumWeight>
            ))}
          </Div>
          <Div
            display="flex"
            width={[1, 1, 1, 370]}
            height={["auto", "auto", "auto", 120]}
            backgroundColor={"var(--turquoise-light)"}
            alignItems="center"
            ml={3}
          >
            <TextMediumWeight mx={3}>{messages[value.footer]}</TextMediumWeight>
          </Div>
        </Div>
      </Div>
    ));

  return (
    <Div>
      <H2 color="var(--blue-dark)" mt={4} mb={3}>
        {messages[sectionTitle]}
      </H2>
      <TextLarge>{messages[description]}</TextLarge>
      <Div mt={40}>{constructGrads(grad)}</Div>
      <TextLarge display="block" pt={3}>
        {messages[footer]}
      </TextLarge>
    </Div>
  );
};

export default StatementScale;
