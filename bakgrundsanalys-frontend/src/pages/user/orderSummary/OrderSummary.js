import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";
import { H1, H4 } from "@components/Heading";
import Card from "@components/Card";
import Container from "@components/Container";
import Section from "@components/Section";
import Breadcrumb from "@components/Breadcrumb";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import SingleOrderSummary from "./SingleOrderSummary";
import MultipleOrderSummary from "./MultipleOrderSummary";

const OrderSummary = (orderSummaryProps) => {
  const { messages } = useIntl();
  const { isFreeAccount = false } = orderSummaryProps.orderSummaryProps[0];
  const CalculateTotalPrice = (orderSummaryProps) => {
    const orderNumbers = orderSummaryProps.orderSummaryProps.length;
    const price = useSelector(
      (state) => state.servicesReducer.servicesInfo[0].price
    );
    return orderNumbers * Math.round(price);
  };

  const personInformation = useSelector(
    (state) => state.personInformationReducer
  );

  const multiSearchPINs = useSelector(
    (state) => state.klarnaReducer.allSSNInfo
  );

  const url = () => {
    const pins = personInformation.personInfo.map((el) => el.ssn);
    const isMultiple = personInformation.isMultiple;
    if (!isMultiple) {
      return `/sok?ssnnumber=${pins}&multiple=false`;
    } else {
      return `/sok?ssnnumber=${multiSearchPINs}&multiple=true`;
    }
  };

  const constructBreadcrumbProps = {
    items: [{ label: messages.label_back, url: url() }],
    home: {
      icon: "icon-headerarrowright",
      url: url(),
    },
  };

  return (
    <Section>
      <Container>
        <Breadcrumb p={0} py={3} {...constructBreadcrumbProps} />
        <H1 mb={3}>{messages.title_checkout}</H1>
        <H4 mb={40}>{messages.byline_checkout}</H4>
        <Card
          header={<Header />}
          footer={
            <Footer
              isFreeAccount={isFreeAccount}
              totalprice={CalculateTotalPrice(orderSummaryProps)}
            />
          }
          width={[1]}
        >
          <Content {...orderSummaryProps} />
        </Card>
        {orderSummaryProps.orderSummaryProps.length > 1 ? (
          <MultipleOrderSummary isFreeAccount={isFreeAccount} />
        ) : (
          <SingleOrderSummary isFreeAccount={isFreeAccount} />
        )}
      </Container>
    </Section>
  );
};

OrderSummary.propTypes = {
  orderSummaryProps: Proptypes.array,
};

export default OrderSummary;
