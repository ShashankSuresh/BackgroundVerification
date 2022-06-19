import React, { useState } from "react";
import Div from "@components/Div";
import PaymentOption from "./PaymentOption";
import { renderSnippet } from "@utils/utils";

const MultipleOrderSummary = (prop) => {
  const [html, setHTML] = useState("");
  const { isFreeAccount } = prop;

  const htmlSnippet = (val) => setHTML(val.html_snippet);

  return (
    <Div mt={4}>
      <PaymentOption htmlSnippet={htmlSnippet} isFreeAccount={isFreeAccount} />

      <Div mt={5} id="my-checkout-container">
        {!!html.length && renderSnippet(html)}
      </Div>
    </Div>
  );
};

export default MultipleOrderSummary;
