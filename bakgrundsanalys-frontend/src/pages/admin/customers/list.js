import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import { ROUTES, CUSTOMERS_API, WRITE } from "@utils/constant";
import ScrollToTop from "@utils/ScrollToTop";

const List = () => {
  const { messages } = useIntl();
  const history = useHistory();

  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  const handleRedirectToDetails = (e) => {
    const { id, status } = e.data;
    history.push(`${ROUTES.CUSTOMER_DETAILS.URL}?id=${id}&status=${status}`);
  };

  const handleCreateCustomer = () => {
    history.push(ROUTES.ADMIN_CREATE_CUSTOMER.URL);
  };

  let config = [
    {
      title: messages.title_customers,
      headerActions: [
        {
          id: "new-order",
          type: "button",
          label: messages.label_new_customer,
          onClick: handleCreateCustomer,
          width: [1, "auto"],
          icon: "plus",
          variant: "header",
          height: 0,
          px: 3,
          py: 3,
          isHidden: permissions && permissions.customers !== WRITE,
        },
        {
          id: "download",
          type: "button-raised",
          label: messages.label_scv,
          icon: "headerarrowright",
          variant: "header",
          height: 0,
          px: 3,
          py: 3,
        },
      ],
      filterType: "dialog",
      filters: [
        {
          title: messages.label_status,
          id: "is_active",
          type: "checkbox",
          options: [
            {
              label: messages.active,
              value: 1,
              checked: false,
            },
            {
              label: messages.deleted,
              value: 0,
              checked: false,
            },
          ],
        },
      ],
      columns: [
        { field: "status", header: messages.label_status, primary: true },
        { field: "name", header: messages.title_customer },
        { field: "company", header: messages.label_owner, sortable: false },
        { field: "orders_count", header: messages.title_orders },
        { field: "action", header: messages.title_actions },
      ],
      rowActions: [
        {
          id: "more",
          label: messages.label_more,
          type: "link",
          icon: "headerarrowright",
          color: "var(--blue-dark)",
          variant: "column",
          isPrimary: true,
        },
      ],
      pagination: true,
      sortable: true,
      selectionMode: "multiple",
      detailedPageURL: ROUTES.CUSTOMER_DETAILS.URL,
    },
  ];

  return (
    <ScrollToTop>
      <Container m={"0px !important"}>
        <DataTable
          config={config}
          screenName={CUSTOMERS_API}
          handleRedirectToDetails={handleRedirectToDetails}
        />
      </Container>
    </ScrollToTop>
  );
};

export default List;
