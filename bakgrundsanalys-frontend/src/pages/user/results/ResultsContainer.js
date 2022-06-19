import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { H3 } from "@components/Heading";
import { TextLargeSemiBoldWeight, TextLarge } from "@components/Text";
import Card from "@components/Card";
import Div from "@components/Div";
import ordersKlarnaService from "@app/services/orders/ordersKlarnaService";
import { addHyphenToNumber, splitString } from "@utils/utils";

const ResultsContainer = (props) => {
  const { messages } = useIntl();
  const location = useLocation();
  const { content, orders = {} } = props;

  const query = new URLSearchParams(location.search);

  const _orderId = splitString(query.get("order_id") || "")[0];

  useEffect(() => {
    if (_orderId) {
      try {
        const fetchOrderDetails = async () => {
          await ordersKlarnaService(_orderId);
        };
        fetchOrderDetails();
      } catch (e) {
        throw new Error(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotalVal = () => {
    let multipleSSN = {};
    const seen = new Set();

    const finalContent = content.map((val) =>
      orders.order.order_items.filter((el) => el.personal_number === val.ssn)
    );

    const filteredArr = orders.order.order_items.filter((el) => {
      const duplicate = seen.has(el.personal_number);
      seen.add(el.personal_number);
      return !duplicate;
    });

    // Only applicable when one order has many services
    finalContent.forEach((el) => {
      if (el.length > 1) {
        multipleSSN = {
          total: el.map((el) => parseInt(el.price)).reduce((a, b) => a + b, 0),
          ssn: el[0].personal_number,
        };
        return (filteredArr.find(
          (el) => el.personal_number === multipleSSN.ssn
        ).price = multipleSSN.total);
      }
    });

    return filteredArr;
  };

  calculateTotalVal();

  return (
    <Div>
      {calculateTotalVal().map((value, key) => (
        <>
          <Div my={4}>
            <TextLarge pb={[3]}>{value.person_name}</TextLarge>
            <TextLarge display="block">
              {addHyphenToNumber(value.personal_number, 8)}
            </TextLarge>
          </Div>

          <Div width={[1, 1, 7.3 / 10]} display="flex" alignItems="end">
            <Card
              key={key}
              p={4}
              title={
                <Div display="flex" justifyContent="space-between">
                  <H3>{value.name}</H3>
                  <H3 pb={1} display="block">
                    {`SEK ${Math.round(value.price)}`}
                  </H3>
                </Div>
              }
              width={[1, 1, 1]}
              color={"var(--grey-dark)"}
            >
              <Div mb={[4]}>
                <TextLargeSemiBoldWeight py={[1]} display="block" semibold>
                  {value.status}
                  {messages.order_confirmation_card_header}
                </TextLargeSemiBoldWeight>
                <TextLarge width={[1, 1, 1, "690px"]} display="block" mt={[2]}>
                  {messages.order_confirmation_card_footer}
                </TextLarge>
              </Div>
            </Card>
          </Div>
        </>
      ))}
    </Div>
  );
};

ResultsContainer.propTypes = {
  content: PropTypes.array,
  orders: PropTypes.array,
};

export default ResultsContainer;
