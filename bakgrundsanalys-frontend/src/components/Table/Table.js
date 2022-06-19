import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { CSVLink as PRCSVLink } from "react-csv";
import Proptypes from "prop-types";
import styled from "styled-components";
import { DataTable as PRDataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { space, layout, flexbox, position } from "styled-system";
import { HeaderFilterTemplate, BodyTemplate } from "./HeaderTemplate";
import Div from "@components/Div";
import Link from "@components/Link";
import Icon from "@components/Icon";
import { STATUS_VALUES, ASSIGNMENTS_API } from "@utils/constant";
import { TextMediumWeight, TextUpperCase } from "@components/Text";
import { H5, H4 } from "@components/Heading";
import listData from "@app/services/common/listDataService";
import { parseFilterParams, getSortKey } from "@utils/utils";

const StyledDataTable = styled(PRDataTable)(space, layout, flexbox, position);

const StyledDiv = styled(Div)`
  i {
    transform: rotate(180deg);
  }
`;

const CSVLink = styled(PRCSVLink)`
  display: none;
`;

const DataTable = (props) => {
  const { messages } = useIntl();
  const [csvDownloadData, setCsvDownloadData] = useState([]);

  const {
    title,
    subTitle,
    headerActions,
    filterType,
    filters: filterOptions = [],
    columns,
    pagination,
    selectionMode,
    rowActions,
  } = props.config[0];

  const {
    screenName = "",
    customerId = "",
    userType = "",
    reloadList = false,
    handleRedirectToDetails = () => {},
  } = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState(filterOptions);
  const [lazyParams, setLazyParams] = useState({
    rows: 10,
    page: 1,
    sortOrder: 1,
    filters: {},
  });
  const [emptyMessage, setEmptyMessage] = useState("No data found");

  const dataTableRef = useRef(null);

  const downloadCsv = useRef(null);

  const formatCsvData = (data) => {
    const formattedData = data.map((obj) => {
      const item = {};
      Object.entries(obj).map((x) => {
        const key = JSON.stringify(x[0]);
        const value = JSON.stringify(x[1]);
        item[key] = value;
        return x;
      });
      return item;
    });
    return formattedData;
  };

  const handleDownloadCSV = async () => {
    const param = "?export=1";
    try {
      const csvData = await listData(screenName, param);
      const { data = [] } = csvData;
      setCsvDownloadData(formatCsvData(data));
      downloadCsv.current.link.click();
    } catch (e) {
      throw new Error(e);
    }
  };

  const fetchPrimaryHeader = () =>
    columns
      .filter((value) => value.primary === true)
      .map((value) => value.field);

  const fetchPrimaryAction = () =>
    rowActions.filter((element) => element.isPrimary === true);

  const fetchSecondaryAction = () =>
    rowActions.filter((element) => !element.isPrimary);

  const handleFilters = (selectedFilters, options, event) => {
    const filterData = {};
    selectedFilters.map((obj) => {
      if (obj.id === "date") {
        filterData["start_date"] = [obj.values[0] ? obj.values[0] : ""];
        filterData["end_date"] = [obj.values[1] ? obj.values[1] : ""];
      } else {
        filterData[obj.id] = [];
        filterData[obj.id].push(obj.values);
      }
      return obj;
    });
    let _lazyParams = {
      ...lazyParams,
      ...event,
      filters: filterData,
    };
    setLazyParams(_lazyParams);
    setFilters(options);
  };

  const headerTemplateProps = {
    title,
    subTitle,
    headerActions,
    filterType,
    filters,
    onApplyFilter: handleFilters,
    onCancelFilter: handleFilters,
  };

  const actionBodyTemplateProps = {
    headerActions: rowActions,
  };

  const resBodyTemplate = (rowData) => {
    const getPrimaryHeader = fetchPrimaryHeader();
    const headerActions = fetchPrimaryAction();
    const props = { headerActions };

    return (
      <>
        <TextUpperCase>{rowData[getPrimaryHeader[0]]}</TextUpperCase>
        <BodyTemplate {...props} />
      </>
    );
  };

  const bodyTemplate = (rowData, e) => {
    if (e.field === "action") {
      const headerActions = fetchSecondaryAction();
      const props = { headerActions };

      return (
        <>
          {rowActions.length > 1 && (
            <>
              <TextUpperCase className="p-column-title">
                {e.header}
              </TextUpperCase>
              <Div display={"flex"} justifyContent="flex-end">
                <BodyTemplate {...props} />
              </Div>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <TextUpperCase className="p-column-title">{e.header}</TextUpperCase>
          {rowData[e.field] ? (
            STATUS_VALUES.includes(
              rowData[e.field].toString().toLowerCase()
            ) ? (
              <TextMediumWeight
                className={`${rowData[e.field].toString().toLowerCase()}`}
              >
                {messages[rowData[e.field].toString().toLowerCase()]}
              </TextMediumWeight>
            ) : (
              <TextMediumWeight>
                {messages[rowData[e.field]] || rowData[e.field]}
              </TextMediumWeight>
            )
          ) : (
            <>
              {screenName === ASSIGNMENTS_API ? (
                <>
                  <Icon name="sign" color="var(--red)" mr={2} />{" "}
                  <TextMediumWeight className="not_assigned">
                    {messages["not_assigned"]}
                  </TextMediumWeight>
                </>
              ) : (
                "-"
              )}
            </>
          )}
        </>
      );
    }
  };

  const header = () => (
    <HeaderFilterTemplate
      {...headerTemplateProps}
      onDownload={handleDownloadCSV}
    />
  );

  const actionBodyTemplate = () => (
    <BodyTemplate {...actionBodyTemplateProps} />
  );

  const paginatorTemplate = {
    layout: "PrevPageLink CurrentPageReport NextPageLink",

    // eslint-disable-next-line react/display-name
    PrevPageLink: (options) => {
      return (
        <Link onClick={options.onClick} disabled={options.disabled}>
          <StyledDiv display="flex" flexDirection="reverse" opacity={1} px={3}>
            <Icon name={"headerarrowright"} color={"var(--turquoise)"} mr={2} />
            <H4 color="var(--blue-dark)">{messages.label_previous}</H4>
          </StyledDiv>
        </Link>
      );
    },
    // eslint-disable-next-line react/display-name
    CurrentPageReport: (options) => {
      return (
        <H5>
          {options.first} - {options.last} {messages.text_of}{" "}
          {options.totalRecords}
        </H5>
      );
    },
    // eslint-disable-next-line react/display-name
    NextPageLink: (options) => {
      return (
        <Link onClick={options.onClick} disabled={options.disabled}>
          <Div display="flex" flexDirection="reverse" opacity={1} px={3}>
            <H4 color="var(--blue-dark)">{messages.label_next}</H4>
            <Icon ml={2} name={"headerarrowright"} color={"var(--turquoise)"} />
          </Div>
        </Link>
      );
    },
  };

  const onSort = (event) => {
    let _lazyParams = {
      ...lazyParams,
      ...event,
      sortOrder: lazyParams.sortOrder === -1 ? 1 : -1,
    };
    setLazyParams(_lazyParams);
  };

  const onPage = (event) => {
    const { page } = event;
    let _lazyParams = {
      ...lazyParams,
      ...event,
      page: page + 1,
    };
    setLazyParams(_lazyParams);
  };

  let loadLazyTimeout = null;

  const loadLazyData = async () => {
    try {
      setLoading(true);

      if (loadLazyTimeout) {
        clearTimeout(loadLazyTimeout);
      }

      const {
        rows = 10,
        page = 1,
        sortOrder = 1,
        sortField = "created_at",
        filters = {},
      } = lazyParams;

      const sortKey = getSortKey(sortField, screenName);
      const sort = sortOrder === 1 ? "desc" : "asc";
      let payload = `?pagesize=${rows}&pagenumber=${page}&sort=${sort}&sortby=${sortKey}`;
      if (userType) {
        payload = `${payload}&type=${userType}`;
      }
      if (customerId) {
        payload = `${payload}&customer_id=${customerId}`;
      }
      if (filters && Object.keys(filters).length) {
        payload = `${payload}&${parseFilterParams(["filter", filters])}`;
      }
      const listDataResponse = await listData(screenName, payload);
      const {
        data,
        meta: { total = "" },
      } = listDataResponse;

      setTotalRecords(total);
      setData(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setEmptyMessage("No data found");
    }
  };

  const handleRowClick = (event) => handleRedirectToDetails(event);

  useEffect(() => {
    loadLazyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyParams, reloadList]);

  useEffect(() => {
    setFilters(filterOptions);
  }, [filterOptions]);

  return (
    <Div className="datatable-doc-demo">
      <CSVLink
        data={csvDownloadData}
        filename={`${screenName}.csv`}
        ref={downloadCsv}
        separator={";"}
      >
        click
      </CSVLink>
      <Div className="card">
        <StyledDataTable
          ref={dataTableRef}
          value={data}
          header={header()}
          className="p-datatable-customers"
          dataKey="id"
          rowHover
          paginator={pagination}
          paginatorTemplate={paginatorTemplate}
          selectionMode={selectionMode}
          rows={10}
          emptyMessage={emptyMessage}
          loading={loading}
          lazy
          onSort={onSort}
          onPage={onPage}
          totalRecords={totalRecords}
          first={lazyParams.first}
          onRowClick={handleRowClick}
        >
          <Column body={resBodyTemplate} />
          {columns.map((value, i) => {
            const { sortable = true } = value;
            return (
              <Column
                key={i}
                field={value.field}
                header={value.header}
                sortable={sortable}
                body={bodyTemplate}
              />
            );
          })}
          <Column body={actionBodyTemplate} />
        </StyledDataTable>
      </Div>
    </Div>
  );
};

DataTable.propTypes = {
  config: Proptypes.array,
  screenName: Proptypes.string,
  handleRedirectToDetails: Proptypes.func,
  userType: Proptypes.string,
  customerId: Proptypes.string,
  reloadList: Proptypes.bool,
};

export default DataTable;
