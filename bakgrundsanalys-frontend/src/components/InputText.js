import React from "react";
import StyledInputText from "@components/StyledInputText";
import Div from "@components/Div";
import InputPassword from "./InputPassword";
import { addHyphenToNumber } from "@utils/utils";
import { INPUT } from "@utils/constant";
import { TextUpperCase } from "@components/Text";
import { Error } from "@components/Heading";

export const InputText = (props) => <CustomInputText {...props} />;
const CustomInputText = (prop) => {
  const {
    formikProps,
    name,
    label,
    type,
    maxLength,
    isPassword,
    labelAlignment = "center",
    disabled = false,
  } = prop;
  const {
    errors = {},
    touched = {},
    handleChange,
    handleBlur,
  } = formikProps || {};
  const errorMessage = errors[name] || "";
  const touchedMessage = touched[name] || "";

  const handleKeyPress = (evt) => {
    const event = evt || window.event;
    const { value: eventValue, name: eventName } = event.target;
    const { COMPANY_NUMBER, PERSONAL_NUMBER } = INPUT.NAME;
    if (name === COMPANY_NUMBER || name === PERSONAL_NUMBER) {
      if (handleChange) {
        const hyphenPlace = name === COMPANY_NUMBER ? 6 : 8;
        handleChange({
          target: {
            name: [eventName],
            value: addHyphenToNumber(eventValue, hyphenPlace),
          },
        });
      }
    }
  };

  return (
    <>
      <Div mt={3} pt={1} textAlign={labelAlignment}>
        {label && (
          <TextUpperCase mb={2} display="block" {...prop}>
            {label}
          </TextUpperCase>
        )}
      </Div>
      {isPassword ? (
        <InputPassword
          {...prop}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorMessage && touchedMessage}
        />
      ) : (
        <StyledInputText
          {...prop}
          type={type}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errorMessage && touchedMessage}
          maxLength={maxLength}
          onKeyPress={handleKeyPress}
          disabled={disabled}
        />
      )}
      {errorMessage && touchedMessage && (
        <Div pb={1} pt={3} m={labelAlignment !== "left" && "auto"}>
          <Error>{errorMessage}</Error>
        </Div>
      )}
    </>
  );
};

export default InputText;
