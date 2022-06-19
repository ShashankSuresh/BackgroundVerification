import React from "react";
import styled from "styled-components";
import { Fieldset, FieldsetCustom } from "@components/Fieldset";
import { default as Div } from "@components/Div";
import Span from "@components/Span";
import { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import { breakpoints } from "@utils/breakpoints";
import Config from "@src/config";

const mobileBreakPoint = Config.mobileBreakPoint;
export default {
  title: "Components/Fieldset",
};

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

const items = [
  {
    title: "BÖRJA ER SÖKNING",
    content: [
      {
        description:
          "Genom en enkel sökning får ni omedelbar tillgång till kvalificerade bakgrundsanalyser med tydliga bedömningar.",
        list: [
          {
            title: "Vad ni behöver:",
            values: ["Personnummer", "Starta abonnemang hos oss"],
          },
        ],
      },
    ],
  },
  {
    title: "BAKGRUNDSANALYS MED INTERVJU",
    content: [
      {
        description:
          "Vid behov erbjuder vi också en fördjupning av analysen. Våra metoder baseras på Polismyndighetens säkerhetsprövningar.",
        list: [
          {
            title: "Ytterligare metoder:",
            values: [
              "Säkerhetsprövningsintervjuer",
              "Betyg- och ev-granskning",
              "Dold referenstagning och incidenthantering",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "RESULTAT OCH LEVERANS",
    content: [
      {
        description:
          "Vi har tillgång till en omfattande mängd data från både privata rättsdatabaser och myndigheter.",
        list: [
          {
            title: "Informationen inkluderar:",
            values: [
              "Åtal",
              "Domar",
              "Inkomster",
              "Skulder",
              "Bolagsengagemang",
              "Flyttmönster",
            ],
          },
          {
            title: "Leverans:",
            values: ["Kvalificerad analys i pdf-form"],
          },
        ],
      },
    ],
  },
];

const fieldSetCustomProps = [
  {
    title: "BÖRJA ER SÖKNING",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  },
  {
    title: "BÖRJA ER SÖKNING",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  },
  {
    title: "BÖRJA ER SÖKNING",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  },
  {
    title: "BÖRJA ER SÖKNING",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.",
  },
];

const customIcon = (key) => (
  <Icon
    fontSize={"var(--fs-max)"}
    px={26}
    py={14}
    color={"var(--white)"}
    backgroundColor={"var(--turquoise)"}
    className="icon"
  >
    {key + 1}
  </Icon>
);
const customIcons = () => <Icon className="icon" name="avatar" />;

export const FieldsetDefault = () => {
  return (
    <Div
      ml={[4]}
      display="flex"
      justifyContent="center"
      flexWrap="wrap"
      flexDirection={["column", "row"]}
    >
      {items.map((titleContent, titleKeys) => (
        <Div
          key={titleKeys}
          mt={3}
          flex={["100%", "66.66%", "66.66%", "33.33%"]}
          p={20}
        >
          <Fieldset legend={customIcon(titleKeys)} width={[1]} p={3}>
            <Div px={3}>
              <Div my={3}>
                <Span
                  fontSize={"var(--fs-h4)"}
                  fontWeight={"var(--semibold-weight)"}
                  color={"var(--grey-dark)"}
                >
                  {titleContent.title}
                </Span>
              </Div>
              {titleContent.content.map(
                (descriptionContent, descriptionKeys) => (
                  <Div key={descriptionKeys} mb={3}>
                    <Div mb={3}>
                      <Span lineHeight={"21px"}>
                        {descriptionContent.description}
                      </Span>
                    </Div>
                    {descriptionContent.list.map((listItems, listKeys) => (
                      <>
                        <Span key={listKeys} mb={3} display="block">
                          {listItems.title}
                        </Span>
                        <ul>
                          {listItems.values.map(
                            (listItemss, listItemssKeys) => (
                              <li key={listItemssKeys}>
                                <Icon
                                  color={"var(--blue-dark)"}
                                  name="ellipse"
                                  mr={1}
                                  fontSize={"var(--fs-nano)"}
                                />
                                <Span display="inline-block" pb={3}>
                                  {listItemss}
                                </Span>
                              </li>
                            )
                          )}
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
  );
};

export const FieldsetDefaultCustom = () => {
  return (
    <WithStyledDiv
      ml={3}
      display="flex"
      flexWrap="wrap"
      flexDirection={["column", "row"]}
    >
      {fieldSetCustomProps.map((content, key) => (
        <Div
          key={key}
          mt={[0, 0, 3]}
          mb={[3, 3, 0]}
          flex={["100%", "52%", "40%"]}
        >
          <FieldsetCustom
            legend={customIcons()}
            width={[1]}
            elevation={1}
            py={[2, 2, 3]}
            px={[2, 4, 4]}
          >
            <Div p={3}>
              <Div mb={3}>
                <Span
                  fontSize={"var(--fs-h4)"}
                  fontWeight={"var(--semibold-weight)"}
                  color={"var(--grey-dark)"}
                >
                  {content.title}
                </Span>
              </Div>
              <Div mt={3} lineHeight={"27px"}>
                <Span>{content.description}</Span>
              </Div>
            </Div>
            <Div my={3} ml={3}>
              <LinkArrow
                width={[1, 2 / 3]}
                mb={[3, 0]}
                display={["block", "flex"]}
                color={"var(--blue-dark)"}
                href="#"
                label={"See results"}
              >
                <Icon ml={1} name="headerarrowright" />
              </LinkArrow>
            </Div>
          </FieldsetCustom>
        </Div>
      ))}
    </WithStyledDiv>
  );
};
