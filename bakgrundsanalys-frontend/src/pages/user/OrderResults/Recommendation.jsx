import React from "react";
import { useIntl } from "react-intl";
import { H2, H3 } from "@components/Heading";
import Div from "@components/Div";
import { TextLargeSemiBoldWeight, TextLarge } from "@components/Text";
import Icon from "@components/Icon";
import { recommendationProps } from "./config";

const Recommendation = () => {
  const { messages } = useIntl();

  const {
    sectionTitle,
    indepthContent,
    recommendationContent,
    prisContent,
    contactProps,
  } = recommendationProps;

  const constructContent = (arr) =>
    arr.map((value, index) => (
      <Div key={index}>
        <H3 color="var(--blue-dark)" mb={3}>
          {value.title}
        </H3>
        <>
          {value.description.map((val, index) => (
            <>
              <TextLarge display="block" key={index} mb={2}>
                {val}
              </TextLarge>
              <br />
            </>
          ))}
        </>
      </Div>
    ));

  const constructContentPris = (arr) =>
    arr.map((value, index) => (
      <Div key={index}>
        <H3 color="var(--blue-dark)" mb={4}>
          {value.title}
        </H3>
        {value.content.map((val, indx) => (
          <Div key={indx} display="flex" flexDirection="row" mb={3}>
            <TextLargeSemiBoldWeight
              display="block"
              backgroundColor="var(--turquoise-light)"
              textAlign="left"
              mr={3}
              px={3}
              py={3}
              width={[2 / 3, 2 / 3, 2 / 3, 1 / 3]}
            >
              {val.title}
            </TextLargeSemiBoldWeight>
            <TextLargeSemiBoldWeight
              display="block"
              backgroundColor="var(--turquoise-light)"
              textAlign="center"
              width={[1 / 3, 1 / 3, 1 / 3, 1 / 7]}
              px={3}
              py={3}
            >
              {val.value}
            </TextLargeSemiBoldWeight>
          </Div>
        ))}
      </Div>
    ));

  const constructContactProps = (arr) =>
    arr.map((value, index) => (
      <Div key={index}>
        <H3 color="var(--blue-dark)" mb={3}>
          {value.title}
        </H3>
        <TextLarge display="block" mb={2}>
          {value.description}
        </TextLarge>
        <Div
          display="flex"
          flexDirection={["column", "column", "column", "row"]}
          p={4}
          backgroundColor={"var(--yellow-light)"}
          width={[1, 1, 1, 8 / 13]}
          justifyContent="space-between"
          mt={4}
        >
          {value.content.map((val, index) => (
            <Div key={index} textAlign="center">
              <Icon name={val.icon} fontSize="75px" color="var(--turquoise)" />
              <H3 display="block" py={3}>
                {val.title}
              </H3>
              <H2 display="block">{val.description}</H2>
            </Div>
          ))}
        </Div>
      </Div>
    ));

  return (
    <Div>
      <H2 color="var(--blue-dark)" mt={4} mb={3}>
        {messages[sectionTitle]}
      </H2>

      <Div mb={2}>{constructContent(indepthContent)}</Div>
      <Div mb={2}>{constructContent(recommendationContent)}</Div>
      <Div mb={4}>{constructContentPris(prisContent)}</Div>
      <Div mb={2} pt={3}>
        {constructContactProps(contactProps)}
      </Div>
    </Div>
  );
};

export default Recommendation;
