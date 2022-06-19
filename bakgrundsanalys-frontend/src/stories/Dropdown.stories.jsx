import React, { useState } from "react";
import Dropdown from "@components/Dropdown";

export default {
  title: "Components/Dropdown",
};

const DropdownDefault = (props) => {
  const [selectedCity, setselectedCity] = useState("");

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const onCityChange = (e) => {
    setselectedCity(e.value);
  };

  return (
    <Dropdown
      value={selectedCity}
      options={cities}
      onChange={onCityChange}
      {...props}
    />
  );
};

const DropdownGrouped = (props) => {
  const [selectedGroupedCity, setSelectedGroupedCity] = useState("");

  const groupedCities = [
    {
      label: "Germany",
      code: "DE",
      items: [
        { label: "Berlin", value: "Berlin" },
        { label: "Frankfurt", value: "Frankfurt" },
        { label: "Hamburg", value: "Hamburg" },
        { label: "Munich", value: "Munich" },
      ],
    },
    {
      label: "USA",
      code: "US",
      items: [
        { label: "Chicago", value: "Chicago" },
        { label: "Los Angeles", value: "Los Angeles" },
        { label: "New York", value: "New York" },
        { label: "San Francisco", value: "San Francisco" },
      ],
    },
    {
      label: "Japan",
      code: "JP",
      items: [
        { label: "Kyoto", value: "Kyoto" },
        { label: "Osaka", value: "Osaka" },
        { label: "Tokyo", value: "Tokyo" },
        { label: "Yokohama", value: "Yokohama" },
      ],
    },
  ];

  const onGroupedCityChange = (e) => {
    setSelectedGroupedCity(e.value);
  };

  return (
    <Dropdown
      value={selectedGroupedCity}
      options={groupedCities}
      onChange={onGroupedCityChange}
      {...props}
    />
  );
};

export const DropdownBasic = (args) => (
  <DropdownDefault
    width={1 / 2}
    optionLabel="name"
    placeholder="Default dropdown"
    dropdownIcon="icon-chevrondown"
    {...args}
  />
);

export const DropdownGroup = (args) => (
  <DropdownGrouped
    optionLabel="label"
    optionGroupLabel="label"
    optionGroupChildren="items"
    placeholder="Grouped dropdown"
    dropdownIcon="icon-chevrondown"
    {...args}
  />
);
