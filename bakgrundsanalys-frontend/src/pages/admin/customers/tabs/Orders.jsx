import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import { ROUTES, ORDERS } from "@utils/constant";

const Orders = ({ customerId }) => {
  const history = useHistory();
  const { messages } = useIntl();

  const handleRedirectToDetails = (e) => {
    const { order_id: id } = e.data;
    history.push(`${ROUTES.ADMIN_ORDER_DETAILS.URL}?id=${id}`);
  };

  let config = [
    {
      title: messages.order_history,
      emptyMessage: "No orders found",
      headerActions: [],
      columns: [
        { field: "status", header: messages.label_status, primary: true },
        { field: "date", header: messages.label_date },
        { field: "subUser", header: messages.label_sub_user, sortable: false },
        {
          field: "customerName",
          header: messages.title_customer,
          sortable: false,
        },
        { field: "service", header: messages.label_service, sortable: false },
        { field: "action", header: messages.title_actions },
      ],
      rowActions: [
        {
          id: "more",
          label: messages.label_more,
          type: "link",
          icon: "headerarrowright",
          variant: "secondary",
          fontSize: 16,
          isPrimary: true,
        },
      ],
      filterType: "dialog",
      filters: [],
      pagination: true,
      sortable: true,
      selectionMode: "multiple",
    },
  ];
  return (
    <Container m={"0px !important"}>
      <DataTable
        config={config}
        customerId={customerId}
        screenName={ORDERS.toLowerCase()}
        handleRedirectToDetails={handleRedirectToDetails}
      />
    </Container>
  );
};

Orders.propTypes = {
  customerId: PropTypes.string,
};
export default Orders;
