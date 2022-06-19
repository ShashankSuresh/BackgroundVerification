import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { compose, space, layout, flexbox, position } from "styled-system";
import { H2 } from "@components/Heading";
import { default as PRDialog } from "@components/Dialog";
import ActionTemplate from "./ActionTemplate";
import { useIntl } from "react-intl";
import { formatDate } from "@utils/utils";

const Dialog = styled(PRDialog)`
  ${compose(space, layout, flexbox, position)}
  text-align: center;
  .p-dialog-header {
    padding: 35px 24px 0;
    text-align: center;
    color: var(--grey-dark);
    .p-dialog-title {
      padding-bottom: 40px;
    }
  }
  .p-dialog-content {
    color: var(--grey-dark);
    > div {
      text-align: left;
    }
  }
`;

const FilterTemplate = (props) => {
  const {
    filterType,
    filters = [],
    onApplyFilter,
    onCancelFilter,
    onHide,
  } = props;
  let [options, setOptions] = useState(filters);
  const [optionsCopy, setOptionsCopy] = useState(filters);
  const { messages } = useIntl();

  const onFilterSelectedData = (data = []) => {
    const options = data;
    const selectedData = [];
    options.map((item) => {
      const { options, id, type } = item;
      const checkedData = [];
      options.map((obj) => {
        const { value, checked } = obj;
        if (type === "calendar" && value) {
          checkedData.push(formatDate(value));
        } else if (checked) {
          checkedData.push(value);
        }
        return obj;
      });
      if (checkedData.length) {
        selectedData.push({ id, values: checkedData });
      }
      return item;
    });
    return selectedData;
  };

  useEffect(() => {
    setOptions(filters);
    setOptionsCopy(filters);
  }, [filters]);

  const handleApplyFilters = (e) => {
    const currentData = options;
    const selectedData = onFilterSelectedData(options);
    setOptionsCopy(currentData);
    if (onApplyFilter) {
      onApplyFilter(selectedData, options, e);
    }
    onHide();
  };

  const handleCancelFilters = (e) => {
    const selectedData = onFilterSelectedData(options);
    setOptions(optionsCopy);
    if (onCancelFilter) {
      onCancelFilter(selectedData, options, e);
    }
    onHide();
  };

  const handleClearFilters = () => {
    const clearfilters = options.map((obj) => {
      const { options } = obj;
      obj.options = options.map((opt) => {
        const { id = "" } = opt;
        if (id === "start_date" || id === "end_date") {
          return { ...opt, value: "" };
        }
        return { ...opt, checked: false };
      });
      return obj;
    });
    setOptions(clearfilters);
  };

  const handleOnClick = (value, id) => (e) => {
    const filterSelectedData = options.map((values) => {
      if (values.options)
        values.options = values.options.map((obj) => {
          if (value === "calendar" && obj.id === id) {
            return { ...obj, value: e.value };
          } else if (obj.value === value) {
            return { ...obj, checked: !obj.checked };
          }
          return obj;
        });
      return values;
    });
    setOptions(filterSelectedData);
  };

  const filterButtons = [
    {
      id: "ok",
      type: "button",
      label: messages.label_ok,
      width: [1, "auto"],
      minWidth: 120,
      mb: 3,
      px: 5,
      height: 42,
      onClick: handleApplyFilters,
    },
    {
      type: "button-outlined",
      label: messages.label_clear_filters,
      icon: "rubber",
      width: [1, "auto"],
      minWidth: 120,
      mb: 3,
      px: 4,
      onClick: handleClearFilters,
    },
    {
      type: "button-outlined",
      label: messages.label_cancel,
      width: [1, "auto"],
      minWidth: 120,
      mb: 3,
      px: 5,
      onClick: handleCancelFilters,
    },
  ];

  const values = options.map((value) => {
    let obj = value;
    obj.options = obj.options.map((val) => ({
      ...val,
      onClick: handleOnClick,
    }));
    return obj;
  });

  const generateAllOptions = [...values, ...filterButtons];

  if (filterType === "dialog") {
    const dialogEl = (children) => (
      <Dialog
        header={<H2>{messages.title_filter}</H2>}
        visible={props.showDialog}
        width={[1, 8 / 10, 8 / 12, "50vw"]}
        onHide={props.onHide}
        draggable={false}
      >
        {children}
      </Dialog>
    );
    return [
      dialogEl(
        generateAllOptions.map((value) => ActionTemplate(value.type, value))
      ),
    ];
  }
};

export default FilterTemplate;
