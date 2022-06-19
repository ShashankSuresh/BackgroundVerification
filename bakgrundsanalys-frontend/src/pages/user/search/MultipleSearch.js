import React, { useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { H1 } from "@components/Heading";
import { default as Div } from "@components/Div";
import Icon from "@components/Icon";
import { LinkArrow } from "@components/Link";
import InputTextArea from "@components/InputTextArea";
import { PrimaryButtonIcon } from "@components/Button";
import { ColouredSemiBoldText, Text } from "@components/Text";
import { splitString } from "@utils/utils";

const WithStyledDiv = styled(Div)`
  i.icon {
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    padding: 9px;
  }
  ul {
    li {
      padding-bottom: 20px;
      &:nth-child(2) {
        padding: 0;
      }
    }
  }
`;

const MultipleSearch = (props) => {
  const { messages } = useIntl();
  const { ssnNumbers = [] } = props;
  const [value, setValue] = useState(
    ssnNumbers.length ? ssnNumbers.join("\n") : ""
  );
  const [showError, setShowError] = useState([]);

  const handleOnSSNNumberChange = (e) => {
    setShowError([]);
    setValue(e.target.value);
  };

  const handleRedirection = () => {
    props.handleRedirection(false);
  };

  const handleOnSubmit = () => {
    const isValid = [];
    const pins = splitString(value);
    pins.map((obj) => {
      const pin = obj.includes("-") ? obj.replaceAll("-", "") : obj;
      if (pin && pin.length !== 12) {
        isValid.push(obj);
      }
      return obj;
    });
    if (isValid.length) {
      setShowError(isValid);
    } else {
      setShowError([]);
      if (value.length) {
        return props.handleSearchPin(value, true);
      }
    }
  };

  return (
    <Div>
      <H1>{messages.search_several_pin}</H1>
      <Div width={1} mt={4}>
        <Div
          display={["flex"]}
          flexDirection={["column", "column", "column", "row"]}
          flexWrap={["wrap"]}
        >
          <Div width={[1, 1, 1, 1 / 2]} pr={[0, 4]} order={[1, 1, 1, 1]}>
            <InputTextArea
              width={1}
              rows={5}
              cols={30}
              placeholder={messages.placeholder_search_multiple}
              value={value}
              onChange={handleOnSSNNumberChange}
            />
          </Div>
          <Div
            width={[1, 1, 1, 1 / 2]}
            order={[3, 3, 3, 2]}
            mt={[3, 3, 3, 0]}
            pl={[3, 3, 3, 0]}
          >
            <Div
              p={4}
              display={["block", "block", "block", "flex"]}
              position="relative"
              backgroundColor={"rgba(var(--grey-lightest-rgba), .3)"}
            >
              <WithStyledDiv>
                <Icon className="icon" rounded name="sign" />
              </WithStyledDiv>
              <Div
                width={1}
                display={["block", "block", "block", "flex"]}
                pl={4}
              >
                <WithStyledDiv flex={2} width={[1, 1, 1, 1 / 2]}>
                  <ul>
                    <li>
                      <Icon color={"var(--blue-dark)"} name="ellipse" mr={2} />
                      <Text>{messages.up_to_10_ids}</Text>
                    </li>
                    <li>
                      <Icon color={"var(--blue-dark)"} name="ellipse" mr={2} />
                      <Text>{messages.seperate_id_by_comma}</Text>
                    </li>
                  </ul>
                </WithStyledDiv>
                <LinkArrow
                  display={["none", "none", "none", "flex"]}
                  alignItems="center"
                  justifyContent="center"
                  onClick={handleRedirection}
                  label={messages.single_search}
                >
                  <Icon ml={1} name="headerarrowright" />
                </LinkArrow>
              </Div>
            </Div>
          </Div>
          <Div width={1} order={[2, 2, 2, 3]}>
            {showError && showError.length ? (
              <Div width={1}>
                <ColouredSemiBoldText color="var(--red)">{`${
                  messages.invalid_personal_numbers
                }: ${showError.join(", ")}`}</ColouredSemiBoldText>
              </Div>
            ) : (
              ""
            )}
            <PrimaryButtonIcon
              mt={4}
              label={messages.search_text}
              icon="icon-search"
              onClick={handleOnSubmit}
            />
          </Div>
        </Div>

        <Div mt={4}>
          <LinkArrow
            display={["flex", "flex", "flex", "none"]}
            alignItems="center"
            justifyContent="flex-start"
            label={messages.single_search}
            onClick={handleRedirection}
          >
            <Icon ml={1} name="headerarrowright" />
          </LinkArrow>
        </Div>
      </Div>
    </Div>
  );
};

MultipleSearch.propTypes = {
  ssnNumbers: PropTypes.array,
  handleSearchPin: PropTypes.func,
  handleRedirection: PropTypes.func,
};

export default MultipleSearch;
