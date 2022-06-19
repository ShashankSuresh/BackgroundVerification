import React from "react";
import { useIntl } from "react-intl";
import { H2, H3 } from "@components/Heading";
import { Text, TextLarge, EllipseIconText } from "@components/Text";
import Container from "@components/Container";
import Div from "@components/Div";
import Icon from "@components/Icon";
import Section from "@components/Section";
import { Fieldset } from "@components/Fieldset";
import { EllipseIcon } from "@components/CountTag";

const customIcon = (key) => (
  <EllipseIcon>
    <EllipseIconText>{key + 1}</EllipseIconText>
  </EllipseIcon>
);

const Services = () => {
  const { messages } = useIntl();
  const items = [
    {
      title: messages.simple_search,
      content: [
        {
          description: messages.description_simple_search,
          list: [
            {
              title: messages.message_details_need,
              values: [
                messages.label_personal_number,
                messages.message_start_with_us,
              ],
            },
          ],
        },
      ],
    },
    {
      title: messages.title_analysis_directly,
      content: [
        {
          description: messages.description_analysis,
          list: [
            {
              title: messages.title_info_details,
              values: [
                messages.label_prosecution,
                messages.label_judge,
                messages.label_personal_connections,
                messages.label_income,
                messages.label_liabilities,
                messages.label_corporate_involvement,
                messages.label_accommodation,
                messages.label_vehicle_ownership,
                messages.label_with_more,
              ],
            },
          ],
        },
      ],
    },
    {
      title: messages.title_professional_support,
      content: [
        {
          description: messages.byline_professional_support,
          list: [
            {
              title: messages.title_we_offer,
              values: [
                messages.label_indepth_interview,
                messages.label_control,
              ],
            },
            {
              title: messages.label_additional_services,
              values: [
                messages.label_incident_management,
                messages.label_advice,
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <Section backgroundColor="var(--yellow-light)">
      <Container>
        <Div>
          <H2 my={3} pb={2}>
            {messages.title_services}
          </H2>
          <TextLarge display="block" width={[1, 1, 1, "44%"]} pb={(0, 0, 3)}>
            {messages.byline_feature_services}
          </TextLarge>
          <Div
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            flexDirection={["column", "column", "column", "row"]}
          >
            {items.map((titleContent, titleKeys) => (
              <Div
                key={titleKeys}
                mt={3}
                flex={["100%", "100%", "100%", "32.33%"]}
                py={2}
                pr={[0, 0, 4]}
              >
                <Fieldset legend={customIcon(titleKeys)} width={[1]} p={3}>
                  <Div px={3}>
                    <H3 mb={3}>{titleContent.title}</H3>
                    {titleContent.content.map(
                      (descriptionContent, descriptionKeys) => (
                        <Div key={descriptionKeys} mb={3}>
                          <Text mb={3} display="block">
                            {descriptionContent.description}
                          </Text>
                          {descriptionContent.list.map((listItem, listKeys) => (
                            <>
                              <Text key={listKeys} mb={3} display="block">
                                {listItem.title}
                              </Text>
                              <ul>
                                {listItem.values.map((listVal, listKeys) => (
                                  <li key={listKeys}>
                                    <Icon
                                      color={"var(--blue-dark)"}
                                      name="ellipse"
                                      mr={1}
                                      fontSize={"var(--fs-icon)"}
                                    />
                                    <Text display="inline-block" pb={3}>
                                      {listVal}
                                    </Text>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ))}
                        </Div>
                      )
                    )}
                  </Div>
                </Fieldset>
              </Div>
            ))}
          </Div>
        </Div>
      </Container>
    </Section>
  );
};

export default Services;
