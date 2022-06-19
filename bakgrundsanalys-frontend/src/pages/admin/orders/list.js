import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import ScrollToTop from "@utils/ScrollToTop";
import CreateOrder from "./Create";
import customerService from "@app/services/customers/customerService";
import servicesService from "@app/services/services/servicesService";
import { servicesActions } from "@app/reducers/servicesReducer";
import { ROUTES, ORDERS_API, WRITE } from "@utils/constant";

const List = () => {
  const { messages } = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [reloadList, setReloadList] = useState(false);

  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { permissions = {} } = userInfo;

  useEffect(() => {
    try {
      const loadCustomerData = async () => {
        const response = await customerService();
        let { data: { data: customers = [] } = {} } = response;
        customers = customers.map((obj) => {
          const { name = "", id = "" } = obj;
          return { label: `${name} - #${id}`, value: id };
        });
        setCustomerData(customers);
      };
      const loadServices = async () => {
        const servicesResponse = await servicesService();
        const { data = [] } = servicesResponse;
        setServicesData(data);
        dispatch(servicesActions.servicesInfo(data));
      };

      loadCustomerData();
      loadServices();
    } catch (e) {
      throw new Error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirectToDetails = (e) => {
    const { order_id: id } = e.data;
    history.push(`${ROUTES.ADMIN_ORDER_DETAILS.URL}?id=${id}`);
  };

  const handleCreateOrder = () => {
    if (showModal) {
      setReloadList(!reloadList);
    }
    setShowModal(!showModal);
  };

  let config = [
    {
      title: messages.order_history,
      headerActions: [
        {
          id: "new-order",
          type: "button",
          label: messages.label_new_order,
          onClick: handleCreateOrder,
          width: [1, "auto"],
          icon: "plus",
          variant: "header",
          height: 0,
          px: 4,
          py: 20,
          isHidden: permissions && permissions.orders !== WRITE,
        },
        {
          id: "filter",
          type: "button-raised",
          icon: "filter",
          variant: "header",
          borderRadius: 0,
        },
        {
          id: "download",
          type: "button-raised",
          label: messages.label_scv,
          icon: "headerarrowright",
          variant: "header",
          height: 0,
          px: 3,
          py: 20,
        },
      ],
      filterType: "dialog",
      filters: [
        {
          title: messages.label_status,
          id: "status",
          type: "checkbox",
          options: [
            {
              label: messages.not_paid,
              value: "not-paid",
              checked: false,
            },
            {
              label: messages.waiting,
              value: "waiting",
              checked: false,
            },
            {
              label: messages.completed,
              value: "completed",
              checked: false,
            },
            {
              label: messages.paid,
              value: "paid",
              checked: false,
            },
            {
              label: messages.cancelled,
              value: "cancelled",
              checked: false,
            },
          ],
        },
        {
          title: messages.label_date,
          id: "date",
          type: "calendar",
          label: messages.label_date,
          options: [
            {
              label: messages.filter_date_from,
              value: "",
              id: "start_date",
            },
            {
              label: messages.filter_date_to,
              value: "",
              id: "end_date",
            },
          ],
        },
      ],
      columns: [
        { field: "status", header: messages.label_status, primary: true },
        { field: "date", header: messages.label_date },
        { field: "customer", header: messages.title_customer, sortable: false },
        { field: "username", header: messages.label_user, sortable: false },
        { field: "service", header: messages.label_service, sortable: false },
        { field: "action", header: messages.title_actions },
      ],
      rowActions: [
        {
          id: "more",
          label: messages.label_more,
          type: "link",
          icon: "headerarrowright",
          variant: "column",
          isPrimary: true,
        },
      ],
      pagination: true,
      sortable: true,
      selectionMode: "multiple",
    },
  ];

  return (
    <ScrollToTop>
      <Container m={"0px !important"}>
        <DataTable
          config={config}
          screenName={ORDERS_API}
          handleRedirectToDetails={handleRedirectToDetails}
          reloadList={reloadList}
        />
      </Container>
      {showModal && (
        <CreateOrder
          onCancel={handleCreateOrder}
          availableCustomers={customerData}
          availableServices={servicesData}
        />
      )}
    </ScrollToTop>
  );
};

export default List;
