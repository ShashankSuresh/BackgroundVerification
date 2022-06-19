import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import Container from "@components/Container";
import { default as Div } from "@components/Div";
import { H3 } from "@components/Heading";
import { TextLarge } from "@components/Text";
import Icon from "@components/Icon";
import { LinkArrow } from "@components/Link";
import Section from "@components/Section";
import { FieldsetCustom } from "@components/Fieldset";
import { breakpoints } from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;

const WithStyledDiv = styled(Div)`
  margin-left: 30px;
  > div:nth-child(odd) {
    margin-right: 40px;
  }
  @media (max-width: ${breakpoints[mobileBreakPoint]}px) {
    margin-left: 0px;
    > div:nth-child(odd) {
      margin-right: 0px;
    }
  }
`;

const customIcons = (iconName) => <Icon className="icon" name={iconName} />;

const Features = () => {
  const { messages } = useIntl();
  const varItems = [
    {
      title: messages.title_bg_analysis,
      description: messages.label_description_services_1,
      icon: "avatar",
      url: "bakgrundsanalys/",
    },
    {
      title: messages.title_security_screening,
      description: messages.label_description_services_2,
      icon: "search",
      url: "sakerhetsprovning/",
    },
    {
      title: messages.title_counseling,
      description: messages.label_description_services_3,
      icon: "shield",
      url: "radgivning/",
    },
    {
      title: messages.title_incident_mgmnt,
      description: messages.label_description_services_4,
      icon: "sign",
      url: "incidenthantering/",
    },
  ];

  return (
    <Section mt={["auto", 20]}>
      <Container>
        <Div>
          <H3 my={3}>{messages.title_feature_services}</H3>
          <TextLarge
            width={[1, "auto"]}
            maxWidth={[400, 400, 400, 540]}
            my={[0, 0, 0, 4]}
            display="block"
          >
            {messages.byline_feature_services}
          </TextLarge>
        </Div>
        <WithStyledDiv
          display="flex"
          flexWrap="wrap"
          flexDirection={["column", "column", "column", "row"]}
        >
          {varItems.map((content, key) => (
            <Div
              key={key}
              mt={[0, 0, 0, 3]}
              mb={[3, 3, 3, 0]}
              flex={["100%", "100%", "100%", "40%"]}
            >
              <FieldsetCustom
                legend={customIcons(content.icon)}
                width={[1]}
                elevation={1}
                py={[2, 2, 2, 3]}
                px={[2, 4, 4, 4]}
              >
                <Div px={3}>
                  <H3 my={3} display="block">
                    {content.title}
                  </H3>
                  <TextLarge mb={3} display="block">
                    {content.description}
                  </TextLarge>
                </Div>
                <Div mt={4} pt={2} pb={3} ml={3}>
                  <LinkArrow
                    label={messages.label_read_more}
                    href={`${Config.WP_URL}/tjanster/${content.url}`}
                    direction="left"
                    my={3}
                    mb={[3, 0]}
                  >
                    <Icon ml={1} name="headerarrowright" />
                  </LinkArrow>
                </Div>
              </FieldsetCustom>
            </Div>
          ))}
        </WithStyledDiv>
      </Container>
    </Section>
  );
};

export default Features;
