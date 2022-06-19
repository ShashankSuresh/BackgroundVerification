import React, { useState } from "react";
import { default as Div } from "@components/Div";
import { H2, H4 } from "@components/Heading";
import ActionTemplate from "./ActionTemplate";
import FilterTemplate from "./FilterTemplate";

export const HeaderFilterTemplate = (props) => {
  const {
    title,
    subTitle,
    headerActions,
    filterType,
    filters,
    onApplyFilter,
    onCancelFilter,
  } = props;

  const filterTemplateProps = {
    filterType,
    filters,
    onApplyFilter,
    onCancelFilter,
  };

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center"); // eslint-disable-line

  const handleOnClick = (e, name, position = "center") => {
    setDisplayBasic(true);
    setPosition(position);
  };

  const handleOnHide = () => {
    setDisplayBasic(false);
  };

  const headerComponent = (children) => (
    <Div className="table-header">
      <Div display="flex" flexDirection={"column"}>
        <H2 my={3}>{title}</H2>
        {subTitle && <H4 mt={3}>{subTitle}</H4>}
      </Div>
      <Div display="flex" alignItems={"center"}>
        {children}
      </Div>
      <FilterTemplate
        {...filterTemplateProps}
        showDialog={displayBasic}
        onHide={handleOnHide}
      />
    </Div>
  );
  const headerEl = headerActions.map((value) => {
    if (value.id === "filter") {
      return ActionTemplate(value.type, { ...value, onClick: handleOnClick });
    } else if (value.id === "download") {
      return ActionTemplate(value.type, {
        ...value,
        onClick: props.onDownload,
      });
    }
    return ActionTemplate(value.type, value);
  });
  return headerComponent(headerEl);
};

export const BodyTemplate = (headerTemplateProps) => {
  const { headerActions } = headerTemplateProps;
  const elComponent = (children) => (
    <Div display="flex" justifyContent="space-between" flexWrap="wrap">
      {children}
    </Div>
  );
  const el = headerActions.map((value) => {
    return ActionTemplate(value.type, value);
  });
  return elComponent(el);
};
