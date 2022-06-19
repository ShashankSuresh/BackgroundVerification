import React from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import Section from "@components/Section";
import Container from "@components/Container";
import Div from "@components/Div";
import Divider from "@components/Divider";
import { H1, H2, H4 } from "@components/Heading";
import ProfileCreation from "./ProfileCreation";
import ResultsContainer from "./ResultsContainer";

const initSelect = (personInfo, descrption) => {
  return personInfo.map((item) => ({
    ...item,
    descrption,
  }));
};

const Results = () => {
  const { messages } = useIntl();
  const personInfo = useSelector(
    (state) => state.personInformationReducer.personInfo
  );

  const orderId = useSelector(
    (state) => state.klarnaReducer.klarnaInfo.order_id
  );

  const orders = useSelector((state) => state.klarnaReducer.ordersInfo);

  const props = initSelect(personInfo, messages.order_confirmation_first_part);

  return (
    <>
      <Section>
        <Container>
          <Div mb={4}>
            <H1 mb={3} pb={2}>
              {messages.confirmaton}
            </H1>
            <H4>{messages.payment_approved}</H4>
          </Div>
          <Divider />
          <H2 mt={5} mb={3} pb={2}>
            {messages.begin_analysis}
          </H2>
          <ResultsContainer content={props} orders={orders} orderId={orderId} />
        </Container>
      </Section>
      <ProfileCreation />
    </>
  );
};

export default Results;
