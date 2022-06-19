import React from "react";
import PropTypes from "prop-types";
import Div from "@components/Div";
import Part from "./Part";

const OrderSummarySingle = ({ content, status }) => {
  const data = content[0];
  return (
    <Div mt={3}>
      <Part item={data} status={status} />
    </Div>
  );
};
OrderSummarySingle.propTypes = {
  content: PropTypes.array,
  status: PropTypes.string,
};
export default OrderSummarySingle;
