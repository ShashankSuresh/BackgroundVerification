import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { H3 } from "@components/Heading";
import Accordion from "@components/Accordion";
import Part from "./Part";
import ScrollToTop from "@utils/ScrollToTop";

const OrderSummaryMultiple = ({ content, activeIndex, status }) => {
  const { messages } = useIntl();
  const data = content.map((obj, index) => {
    const { name: service = "" } = obj;
    return {
      title: <H3>{`${messages.label_part} ${index + 1} ${service}`}</H3>,
      content: <Part item={obj} status={status} />,
    };
  });
  return (
    <ScrollToTop>
      <Accordion content={data} {...activeIndex} />
    </ScrollToTop>
  );
};

OrderSummaryMultiple.propTypes = {
  content: PropTypes.array,
  activeIndex: PropTypes.number,
  status: PropTypes.string,
};

export default OrderSummaryMultiple;
