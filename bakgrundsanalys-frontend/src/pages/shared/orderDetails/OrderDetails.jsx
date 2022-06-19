import React from "react";
import Proptypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import Container from "@components/Container";
import Div from "@components/Div";
import Breadcrumb from "@components/Breadcrumb";
import { H1, H2 } from "@components/Heading";
import {
  Text,
  TextLargeSemiBoldWeight,
  ColouredSemiBoldText,
} from "@components/Text";
import Span from "@components/Span";
import Divider from "@components/Divider";
import Multiple from "./Multiple";
import Single from "./Single";
import {
  ROUTES,
  STATUS_EXPIRED,
  STATUS_PAID,
  STATUS_CANCELLED,
  STATUS_NOT_PAID,
  STATUS_ERROR,
  STATUS_COMPLETED,
} from "@utils/constant";
import { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import Payment from "./Payment";
import { formatDateAndTime } from "@utils/utils";

const OrderDetails = ({
  orderSummaryProps,
  redirectTo = ROUTES.ORDERS_LIST.URL,
  isCustomer,
}) => {
  const history = useHistory();
  const {
    order_items: orderItems = [],
    status = "",
    number: orderNum = "",
    customer = {},
    created_at: createdAt = "",
    user = {},
  } = orderSummaryProps;

  const { messages } = useIntl();
  const breadCrumbItems = [
    { label: messages.label_back_to_orders, url: redirectTo },
  ];
  const breadCrumbProps = {
    icon: "icon-headerarrowright",
    url: redirectTo,
  };

  const handleRedirectToCustomerDetails = () => {
    const { id = "" } = customer;
    history.push(`${ROUTES.CUSTOMER_DETAILS.URL}?id=${id}`);
  };

  const handleStatus = () => {
    switch (status) {
      case STATUS_NOT_PAID:
        return (
          <ColouredSemiBoldText color="var(--blue-dark)">
            {messages.not_paid}
          </ColouredSemiBoldText>
        );
      case STATUS_PAID:
        return (
          <ColouredSemiBoldText color="var(--blue-dark)">
            {messages.paid}
          </ColouredSemiBoldText>
        );
      case STATUS_COMPLETED:
        return (
          <ColouredSemiBoldText>{messages.completed}</ColouredSemiBoldText>
        );
      case STATUS_CANCELLED:
        return (
          <ColouredSemiBoldText color="var(--red)">
            {messages.cancelled}
          </ColouredSemiBoldText>
        );
      case STATUS_ERROR:
        return (
          <ColouredSemiBoldText color="var(--red)">
            {messages.waiting}
          </ColouredSemiBoldText>
        );
      case STATUS_EXPIRED:
        return <ColouredSemiBoldText>{messages.expired}</ColouredSemiBoldText>;
      default:
        return <TextLargeSemiBoldWeight>{status}</TextLargeSemiBoldWeight>;
    }
  };

  return (
    <Div mb={40}>
      <Container m={"0 !important"} pl={3}>
        <Div>
          <Breadcrumb
            pl={0}
            my={3}
            items={breadCrumbItems}
            home={breadCrumbProps}
          />
        </Div>
        <Div pb={2}>
          <Div
            display={["block", "flex"]}
            alignItems="center"
            justifyContent="space-between"
          >
            <H1>{`${messages.label_order} #${orderNum}`}</H1>
            {handleStatus()}
          </Div>
          <Text my={3} pl={1} display="block">
            {`${messages.label_created} ${formatDateAndTime(createdAt)}`}
          </Text>
        </Div>
        {!isCustomer && (
          <Div pt={3} pb={4}>
            <H2 mb={2}>{messages.title_customer}</H2>
            <ul>
              <li>
                <TextLargeSemiBoldWeight display="inline-block" my={2}>
                  {`${messages.label_name}:`}
                  &nbsp;
                </TextLargeSemiBoldWeight>
                <Text>{`${customer && customer.firstname} ${
                  customer && customer.lastname
                }`}</Text>
              </li>
              <li>
                <TextLargeSemiBoldWeight display="inline-block" my={2}>
                  {`${messages.label_user}:`}
                  &nbsp;
                </TextLargeSemiBoldWeight>
                <Text>{user && user.name}</Text>
              </li>
              <li>
                <TextLargeSemiBoldWeight display="inline-block" my={2}>
                  {`${messages.label_email}:`}
                  &nbsp;
                </TextLargeSemiBoldWeight>
                <Text>{`${customer.email}`}</Text>
              </li>
            </ul>
            <LinkArrow
              label={messages.cusomer_details}
              direction="right"
              variant="secondary"
              mt={2}
              onClick={handleRedirectToCustomerDetails}
            >
              <Span px={1}>
                <Icon name="headerarrowright" />
              </Span>
            </LinkArrow>
          </Div>
        )}
        <Div>
          {orderItems.length > 1 ? (
            <>
              <Div mt={4}>
                <Divider />
              </Div>
              <Multiple content={orderItems} activeIndex={0} status={status} />
            </>
          ) : (
            <Single content={orderItems} status={status} />
          )}
        </Div>
        <Payment data={orderSummaryProps} />
      </Container>
    </Div>
  );
};

OrderDetails.propTypes = {
  orderSummaryProps: Proptypes.array,
  redirectTo: Proptypes.string,
  isCustomer: Proptypes.bool,
};

export default OrderDetails;
