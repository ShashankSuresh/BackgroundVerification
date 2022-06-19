import React from "react";
import Breadcrumb from "@components/Breadcrumb";

export default {
  title: "components/Breadcumb",
};

const items = [{ label: "Back", url: "" }];

const home = {
  icon: "icon-headerarrowright",
};

export const BreadcrumbDefault = () => <Breadcrumb items={items} home={home} />;
