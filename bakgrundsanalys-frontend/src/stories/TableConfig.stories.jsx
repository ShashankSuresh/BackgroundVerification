import React from "react";
import DataTable from "@components/Table/Table";

export default {
  title: "Components/Table",
};

export const DataTableConfig = () => {
  const handleNewOrder = () => {};

  const handlerMore = () => {};

  const handlerEdit = () => {};

  let config = [
    {
      title: "Profiles",
      subTitle: "Filtered results",
      headerActions: [
        {
          id: "new-order",
          type: "button",
          label: "New Order",
          width: [1, "auto"],
          icon: "plus",
          variant: "header",
          height: 0,
          px: 3,
          py: 3,
          onClick: handleNewOrder,
        },
        {
          id: "filter",
          type: "button",
          icon: "filter",
          variant: "header",
        },
        {
          id: "download",
          type: "button-raised",
          label: "SCV",
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
          title: "Status",
          type: "checkbox",
          options: [
            {
              label: "Not paid",
              checked: false,
            },
            {
              label: "Wait...",
              checked: false,
            },
            {
              label: "Old",
              checked: false,
            },
            {
              label: "Completed",
              checked: false,
            },
            {
              label: "In progress",
              checked: false,
            },
            {
              label: "Canceled",
              checked: false,
            },
          ],
        },
        {
          title: "Date",
          type: "calendar",
          label: "date",
          options: [
            {
              label: "From",
            },
            {
              label: "To",
            },
          ],
        },
        {
          title: "Results",
          type: "checkbox",
          label: "results",
          options: [
            {
              label: "Done",
              checked: false,
            },
            {
              label: "In progress",
              checked: false,
            },
            {
              label: "Without assignment",
              checked: false,
            },
          ],
        },
        {
          id: "ok",
          type: "button",
          label: "Ok",
          width: [1, "auto"],
          mb: 3,
          px: 5,
        },
        {
          type: "button-outlined",
          label: "Clear Filters",
          icon: "rubber",
          width: [1, "auto"],
          mb: 3,
          px: 4,
        },
        {
          type: "button-outlined",
          label: "Cancel",
          width: [1, "auto"],
          mb: 3,
          px: 5,
        },
      ],
      columns: [
        { field: "status", header: "Status", primary: true },
        { field: "date", header: "Date" },
        { field: "object", header: "Object" },
        { field: "service", header: "Service" },
        { field: "result", header: "Result" },
        { field: "action", header: "Action" },
      ],
      rowActions: [
        {
          id: "more",
          label: "Edit",
          type: "link",
          icon: "headerarrowright",
          variant: "column",
          isPrimary: true,
          onClick: handlerMore,
        },
        {
          id: "action",
          label: "Delete",
          type: "link",
          icon: "headerarrowright",
          variant: "column",
          onClick: handlerEdit,
        },
      ],
      pagination: true,
      sortable: true,
      selectionMode: "multiple",
    },
  ];

  let data = [
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Not paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Paid",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
    {
      status: "Waiting",
      date: "2015-01-27",
      object: "Vanja Ulrika",
      service: "Analys",
      result: "Not ready",
    },
  ];

  let onFilterApplyHanlder = () => {};

  return (
    <DataTable
      config={config}
      data={data}
      filterApplyFunction={onFilterApplyHanlder}
    />
  );
};
