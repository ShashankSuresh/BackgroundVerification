import React from "react";
import Proptypes from "prop-types";
import { useIntl } from "react-intl";
import Div from "@components/Div";
import { H2, H3 } from "@components/Heading";
import { formatDateAndTime } from "@utils/utils";
import { Text, TextLargeSemiBoldWeight } from "@components/Text";

const Payment = ({ data = {} }) => {
  const { messages } = useIntl();
  const {
    user = {},
    total_price: totalPrice = 0,
    created_at: createdAt = "",
    payments = [],
    status = "",
  } = data;

  const { payable_type: paymentType = "" } = (payments && payments[0]) || {};

  const { name = "" } = user || {};
  return (
    <Div mt={40}>
      <H2 mb={3}>{status === "not-paid" ? "Required payment" : "Payment"}</H2>
      <H3 display="block" mb={1}>
        {`SEK ${totalPrice || 0}`}
      </H3>
      {status !== "not-paid" ? (
        <Div>
          <ul>
            <li>
              <TextLargeSemiBoldWeight display="inline-block" my={2} mr={2}>
                {`${messages.label_payment_method}:`}
              </TextLargeSemiBoldWeight>
              <Text>{paymentType || messages.label_manual}</Text>
            </li>
            <li>
              <TextLargeSemiBoldWeight display="inline-block" my={2} mr={2}>
                {`${messages.label_date_time}: `}
              </TextLargeSemiBoldWeight>
              <Text>{createdAt ? formatDateAndTime(createdAt) : "-"}</Text>
            </li>
            <li>
              <TextLargeSemiBoldWeight display="inline-block" my={2} mr={2}>
                {`${messages.label_user}: `}
              </TextLargeSemiBoldWeight>
              <Text>{name ? name : "-"}</Text>
            </li>
          </ul>
        </Div>
      ) : (
        <Div mt={3}>
          <TextLargeSemiBoldWeight>
            {messages.message_order_status_not_paid}
          </TextLargeSemiBoldWeight>
        </Div>
      )}
      {status === "cancelled" && (
        <H3 display="block" mt={3}>
          {`${messages.label_refund}: SEK ${totalPrice || 0}`}
        </H3>
      )}
    </Div>
  );
};

Payment.propTypes = {
  data: Proptypes.object,
};
export default Payment;
