import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { H1 } from "@components/Heading";
import Div from "@components/Div";
import { LinkArrow } from "@components/Link";
import Icon from "@components/Icon";
import { default as StyledInputText } from "@components/StyledInputText";
import { PrimaryButton, PrimaryButtonIcon } from "@components/Button";
import { ColouredSemiBoldText } from "@components/Text";

const InputText = styled(StyledInputText)`
  border-radius: 40px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  &.p-button-icon-only {
    &.p-button-rounded {
      height: 40px;
      width: 62px;
      border-radius: 50px;
    }
  }
`;

const SingleSearch = (props) => {
  const { messages } = useIntl();
  const [value, setValue] = useState(props.ssnNumbers[0]);
  const [showError, setShowError] = useState(false);

  const handleOnSSNNumberChange = (e) => {
    setShowError(false);
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(props.ssnNumbers[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRedirection = () => props.handleRedirection(true);

  const handleOnSubmit = () => {
    let pin = value;
    pin = pin.replaceAll("-", "");
    if (pin && pin.length !== 12) {
      setShowError(true);
    } else {
      setShowError(false);
      if (value.length) {
        return props.handleSearchPin(value, false);
      }
    }
  };

  return (
    <Div className="singlesearch">
      <H1>{messages.search_text}</H1>
      <Div
        display={["none", "flex"]}
        width={[1, 1 / 2, 1 / 2, 1 / 2]}
        className="search__container"
        position="relative"
        mt={4}
      >
        <InputText
          width={1}
          placeholder={messages.placeholder_search}
          value={value}
          onChange={handleOnSSNNumberChange}
        />
        <PrimaryButtonIcon
          position="absolute"
          right={0}
          label={messages.search_text}
          icon="icon-search"
          onClick={handleOnSubmit}
        />
      </Div>
      <Div
        display={["flex", "none"]}
        width={[1]}
        className="search__container"
        position="relative"
        mt={4}
      >
        <InputText
          width={1}
          placeholder={messages.placeholder_search}
          value={value}
          onChange={handleOnSSNNumberChange}
        />
        <StyledPrimaryButton
          position="absolute"
          right={-10}
          icon="icon-search"
          onClick={handleOnSubmit}
        />
      </Div>
      {showError ? (
        <Div width={1} mt={1}>
          <ColouredSemiBoldText color="var(--red)">
            {messages.error_invalid_id}
          </ColouredSemiBoldText>
        </Div>
      ) : (
        ""
      )}
      {props.isAuthenticated && (
        <Div mt={4}>
          <LinkArrow
            display={["none", "flex"]}
            label={messages.search_several_pin}
            onClick={handleRedirection}
          >
            <Icon ml={1} name="headerarrowright" />
          </LinkArrow>
        </Div>
      )}
    </Div>
  );
};

SingleSearch.propTypes = {
  ssnNumbers: PropTypes.array,
  handleSearchPin: PropTypes.func,
  handleRedirection: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default SingleSearch;
