import React from "react";
import { useIntl } from "react-intl";
import { H3, H5 } from "@components/Heading";
import { TextLargeSemiBoldWeight, Text, TextLarge } from "@components/Text";
import Div from "@components/Div";
import Divider from "@components/Divider";
import { ORDER_SUMMARY_CONTENT } from "@utils/constant";

const { PERSON, RAPPORT } = ORDER_SUMMARY_CONTENT;
const Content = ({ orderSummaryProps }) => {
  const { messages } = useIntl();

  return orderSummaryProps.map((list, key) => {
    const { name, ssn, servicesInfo } = list;
    const { name: serviceName, price, detail } = servicesInfo[0];

    return (
      <>
        <Div px={3} pt={3} pb={0} key={key}>
          <Div key={key} mb={4}>
            <Text>
              {PERSON} {key + 1}
            </Text>
            <Div>
              <TextLargeSemiBoldWeight display="block" mt={1}>
                {name}
              </TextLargeSemiBoldWeight>
              <TextLargeSemiBoldWeight display="block" mb={3} pb={2}>
                {ssn}
              </TextLargeSemiBoldWeight>
            </Div>
            <Text>{RAPPORT}</Text>
            <Div width={1} display="flex" justifyContent="space-between" mt={1}>
              <H3 mb={2}>{serviceName}</H3>
              <Div display="flex" flexDirection="column">
                <H3 pb={1}>{`SEK ${Math.round(price)}`}</H3>
                <H5>{messages.exkl_moms}</H5>
              </Div>
            </Div>
            <TextLarge display="block" width={[8 / 10]}>
              {detail}
            </TextLarge>
          </Div>
        </Div>
        <Divider mb={3} />
      </>
    );
  });
};

export default Content;
