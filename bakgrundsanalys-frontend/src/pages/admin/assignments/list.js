import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import Container from "@components/Container";
import DataTable from "@components/Table/Table";
import { ROUTES, ASSIGNMENTS_API } from "@utils/constant";
import ScrollToTop from "@utils/ScrollToTop";
import servicesService from "@app/services/services/servicesService";

const List = () => {
  const { messages } = useIntl();
  const history = useHistory();
  const [services, setServices] = useState([]);

  const handleRedirectToDetails = (e) => {
    const { id } = e.data;
    history.push(`${ROUTES.ASSIGNMENT_DETAILS.URL}?id=${id}`);
  };

  useEffect(() => {
    try {
      const loadServices = async () => {
        const servicesResponse = await servicesService();
        const { data = [] } = servicesResponse;
        setServices(data);
      };
      loadServices();
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  let config = [
    {
      title: messages.title_assignments,
      headerActions: [
        {
          id: "filter",
          type: "button-raised",
          icon: "filter",
          variant: "header",
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
              label: messages.new,
              value: "new",
              checked: false,
            },
            {
              label: messages.status_in_progress,
              value: "in-progress",
              checked: false,
            },
            {
              label: messages.completed,
              value: "completed",
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
        {
          title: messages.label_services,
          id: "service",
          type: "checkbox",
          options: services.map((service) => {
            const { name = "" } = service;
            return { label: name, value: name, checked: false };
          }),
        },
        {
          title: messages.assignment,
          id: "not_assigned",
          type: "checkbox",
          label: messages.label_results,
          options: [
            {
              label: messages.label_none,
              value: 0,
              checked: false,
            },
            {
              label: messages.label_assigned,
              value: 1,
              checked: false,
            },
          ],
        },
      ],
      columns: [
        { field: "assignment", header: messages.assignment, primary: true },
        { field: "status", header: messages.label_status },
        { field: "date", header: messages.label_date_and_time },
        { field: "service", header: messages.label_service, sortable: false },
        { field: "order", header: messages.title_orders, sortable: false },
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
          screenName={ASSIGNMENTS_API}
          handleRedirectToDetails={handleRedirectToDetails}
        />
      </Container>
    </ScrollToTop>
  );
};

export default List;
