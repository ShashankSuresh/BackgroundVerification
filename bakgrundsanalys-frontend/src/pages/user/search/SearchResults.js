import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  useHistory as useHistoryRouterDOM,
  useLocation,
} from "react-router-dom";
import { useIntl } from "react-intl";
import SingleSearch from "./SingleSearch";
import MultipleSearch from "./MultipleSearch";
import { SinglePINLoader, MultiPINLoader } from "./Loader";
import personInformationSearchService from "@app/services/search/personInformationSearchService";
import servicesService from "@app/services/services/servicesService";
import { servicesActions } from "@app/reducers/servicesReducer";
import { personInformationActions } from "@app/reducers/personInformationReducer";
import { klarnaActions } from "@app/reducers/klarnaReducer";
import { H2, H3, H4, ErrorLight } from "@components/Heading";
import Label from "@components/Label";
import Icon from "@components/Icon";
import Checkbox from "@components/Checkbox";
import { PrimaryButtonIcon } from "@components/Button";
import { default as Div } from "@components/Div";
import Container from "@components/Container";
import Section from "@components/Section";
import Card from "@components/Card";
import { TextLargeSemiBoldWeight, Text } from "@components/Text";
import { splitString, isAuthenticated } from "@utils/utils";
import { SSNNUMBER, SINGLE, MULTIPLE, CHECKOUT } from "@utils/constant";
import useHistory from "@utils/useHistory";

const StyledDiv = styled(Div)`
  button {
    display: flex;
    flex-direction: row-reverse;
  }
`;

const SearchResults = () => {
  const isAuthenticatedFlag = isAuthenticated();
  const location = useLocation();
  const history = useHistoryRouterDOM();
  const customHistory = useHistory();
  const query = new URLSearchParams(location.search);

  const { messages } = useIntl();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const _ssnNumber = splitString(
    query.get(SSNNUMBER) ? query.get(SSNNUMBER).replaceAll(",", "\n") : ""
  );
  const isMultiple = query.get(MULTIPLE) === "true" || false;
  const [ssnNumber, setSSNNumber] = useState([]);
  const [isError, setIsError] = useState(false);

  const resetStateValues = () => {
    setData([]);
    setSSNNumber([]);
  };

  const sanitizeData = (responseData, _ssnNumber) => {
    _ssnNumber.forEach((ssn) => {
      const pin = ssn && ssn.replaceAll("-", "");
      if (!responseData.some((data) => data.ssn === pin)) {
        return responseData.push({ ssn: ssn, error: true, isChecked: false });
      }
    });
    return responseData;
  };

  const getPersonInformation = async (_ssnNumber = []) => {
    try {
      resetStateValues();
      setIsError(false);
      setIsFetching(true);

      const response = await personInformationSearchService(_ssnNumber);
      const { data: responseData = [] } = response;
      if (responseData.length === 0) {
        const errorResponse = [
          {
            ssn: _ssnNumber,
            error: true,
            isChecked: false,
          },
        ];
        setData(errorResponse);
        setIsError(true);
      } else if (responseData.length !== ssnNumber.length) {
        setData(sanitizeData(responseData, _ssnNumber));
      } else {
        setData(sanitizeData(responseData, _ssnNumber));
      }
      setSSNNumber(_ssnNumber);
      setIsFetching(false);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    const loadServices = async () => {
      const servicesResponse = await servicesService();
      const { data = [] } = servicesResponse;
      setServicesData(data);
      dispatch(servicesActions.servicesInfo(data));
    };
    loadServices();
    if (_ssnNumber.length) {
      getPersonInformation(_ssnNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirection = (value) => {
    history.push({
      pathname: "/sok",
      search: `?ssnnumber=&multiple=${value ? "true" : "false"}`,
    });
    resetStateValues();
  };

  const handleSearchPin = (pin = [], value) => {
    const param = pin.includes("\n")
      ? pin.replaceAll("\n", ",").trim()
      : pin.trim();
    history.push({
      pathname: "/sok",
      search: `?ssnnumber=${param}&multiple=${value ? "true" : "false"}`,
    });
    resetStateValues();
    return getPersonInformation(splitString(pin));
  };

  const getLoader = () => (ssnNumber.length > 1 ? MULTIPLE : SINGLE);

  const layoutType = getLoader();

  const handleCheckoutRedirection = () => {
    dispatch(klarnaActions.allSSN(data.map((val) => val.ssn)));
    dispatch(
      personInformationActions.personInfo(
        data.filter((val) => val.isChecked !== false)
      )
    );
    dispatch(personInformationActions.isMultiple(isMultiple));
    customHistory.push(CHECKOUT);
  };

  const ServiceUnavailableTemplate = () => (
    <Div>
      <ErrorLight mb={3}>{messages.service_unavailable_title}</ErrorLight>
      <Text display="block" mb={1}>
        {messages.service_unavailalbe_description}
      </Text>
    </Div>
  );

  const DataLayout = () => {
    const validCheck = data.filter((el) => !el.error);

    const [checked, setChecked] = useState(
      new Array(validCheck.length).fill(true)
    );

    const checker = () => checked.every((value) => value === false);

    const updateDataWithCheckboxVal = (index, val) => {
      data[index].isChecked = val;
      return val;
    };

    const handleOnChange = (position) => {
      const updatedCheckedState = checked.map((item, index) =>
        index === position ? updateDataWithCheckboxVal(index, !item) : item
      );

      setChecked(updatedCheckedState);
    };

    return (
      <Div>
        <H2 my={4}>{messages.search_results}</H2>
        {data.map((value, key) => (
          <Div width={[1, 1, 1, 8 / 10]} key={key}>
            <Div>
              <TextLargeSemiBoldWeight my={4} display="block">
                {Array.isArray(value.ssn) ? value.ssn.join(",\n") : value.ssn}
              </TextLargeSemiBoldWeight>
            </Div>
            <Div
              display={["flex"]}
              flexDirection={["column", "column", "column", "row"]}
            >
              <Card
                key={key}
                mr={[0, 0, 0, 4]}
                mb={[4, 4, 4, 0]}
                width={[1, 1, 1, 8 / 10]}
                p={4}
              >
                {value.error ? (
                  <ServiceUnavailableTemplate />
                ) : (
                  <Div>
                    <H4 pb={1}>{value.name}</H4>
                    <Text display="block" mb={3}>
                      {value.ssn}
                    </Text>
                    <Text display="block" mb={1}>
                      {value.street}
                    </Text>
                    <Text display="block" mb={3}>
                      {value.zipcode} {value.city}
                    </Text>
                  </Div>
                )}
              </Card>
              {!value.error && (
                <Card
                  width={[1, 1, 1, 8 / 10]}
                  title={<H3>{messages.security_analysis}</H3>}
                  p={4}
                >
                  <Div>
                    <Div mt={2}>
                      <Checkbox
                        key={key}
                        inputId={key}
                        checked={checked[key]}
                        onChange={() => handleOnChange(key)}
                      />
                      <Label htmlFor={key} className="p-checkbox-label" ml={3}>
                        {(servicesData[0] && servicesData[0].name) || ""}
                      </Label>
                    </Div>
                  </Div>
                </Card>
              )}
            </Div>
          </Div>
        ))}
        {!isError && (
          <StyledDiv>
            <PrimaryButtonIcon
              mt={4}
              label={messages.to_checkout}
              icon={<Icon ml={2} pt={1} name="arrowright" />}
              onClick={handleCheckoutRedirection}
              disabled={checker() ? true : false}
            />
          </StyledDiv>
        )}
      </Div>
    );
  };

  const rednerLoader = () =>
    layoutType === SINGLE ? (
      <SinglePINLoader count={[ssnNumber]} />
    ) : (
      <MultiPINLoader count={ssnNumber} />
    );

  const renderForm = () => (
    <>
      {isMultiple ? (
        <MultipleSearch
          isMultiple={isMultiple}
          ssnNumbers={ssnNumber}
          handleSearchPin={handleSearchPin}
          handleRedirection={handleRedirection}
        />
      ) : (
        <SingleSearch
          isMultiple={isMultiple}
          ssnNumbers={ssnNumber}
          handleSearchPin={handleSearchPin}
          handleRedirection={handleRedirection}
          isAuthenticated={isAuthenticatedFlag}
        />
      )}
      {!!data.length && <DataLayout />}
    </>
  );

  return (
    <Section mt={[4, 0]}>
      <Container>
        <Div width={1}>{isFetching ? rednerLoader() : renderForm()}</Div>
      </Container>
    </Section>
  );
};

SearchResults.propTypes = {
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dataCount: PropTypes.number,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default SearchResults;
