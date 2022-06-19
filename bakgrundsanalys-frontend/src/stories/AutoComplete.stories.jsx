import React, { useState } from "react";
import AutoComplete from "@components/AutoComplete";

export default {
  title: "Components/AutoComplete",
};

const cities = [
  { label: "Berlin", value: "Berlin" },
  { label: "Frankfurt", value: "Frankfurt" },
  { label: "Hamburg", value: "Hamburg" },
  { label: "Munich", value: "Munich" },
  { label: "Chicago", value: "Chicago" },
  { label: "Chennai", value: "Chennai" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "New York", value: "New York" },
  { label: "San Francisco", value: "San Francisco" },
];
export const BasicAutoComplete = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const searchCity = (event) => {
    let filteredCities;
    if (!event.query.trim().length) {
      filteredCities = [...cities];
    } else {
      filteredCities = cities.filter((city) => {
        return city.label.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
    setFilteredCities(filteredCities);
  };
  return (
    <AutoComplete
      value={selectedCity}
      field="label"
      completeMethod={searchCity}
      suggestions={filteredCities}
      onChange={(e) => setSelectedCity(e.value)}
    />
  );
};

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

export const GroupAutoComplete = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const searchCity = (event) => {
    let query = event.query;
    let filteredCities = [];

    for (let country of groupedCities) {
      let filteredItems = country.items.filter(
        (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      if (filteredItems && filteredItems.length) {
        filteredCities.push({ ...country, ...{ items: filteredItems } });
      }
    }

    setFilteredCities(filteredCities);
  };

  const groupedItemTemplate = (item) => {
    return <div>{item.label}</div>;
  };

  return (
    <AutoComplete
      value={selectedCity}
      suggestions={filteredCities}
      completeMethod={searchCity}
      field="label"
      optionGroupLabel="label"
      optionGroupChildren="items"
      optionGroupTemplate={groupedItemTemplate}
      onChange={(e) => setSelectedCity(e.value)}
    />
  );
};
