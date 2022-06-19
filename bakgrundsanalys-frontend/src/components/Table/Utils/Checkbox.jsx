import React from "react";
import Proptypes from "prop-types";
import { default as Div } from "@components/Div";
import Checkbox from "@components/Checkbox";
import Label from "@components/Label";

const CheckboxServices = (props) => {
  const { id, label, value, checked, onClick } = props;

  return (
    <>
      <Checkbox
        key={id}
        inputId={id}
        checked={checked}
        onChange={onClick(value)}
        {...props}
      />
      <Label htmlFor={id} className="p-checkbox-label" ml={15}>
        {label}
      </Label>
    </>
  );
};

CheckboxServices.propTypes = {
  id: Proptypes.string,
  label: Proptypes.string,
  checked: Proptypes.bool,
  onClick: Proptypes.func,
  value: Proptypes.string,
};

const CheckBoxes = ({ value, options }) => {
  return (
    <Div display={["block", "flex"]} my={18}>
      <Div flexBasis={"25%"} mb={[25, 0]}>
        <p>{value.title}</p>
      </Div>
      <Div display="flex" flexDirection="row" flexWrap="wrap" width={1}>
        {options.map((checkbox, key) => (
          <Div
            key={key}
            mb={25}
            width={[1, "33.33%"]}
            display="flex"
            alignItems={"center"}
          >
            <CheckboxServices
              id={checkbox.label}
              label={checkbox.label}
              value={checkbox.value}
              checked={checkbox.checked}
              onClick={checkbox.onClick}
            />
          </Div>
        ))}
      </Div>
    </Div>
  );
};

CheckBoxes.propTypes = {
  value: Proptypes.object,
  options: Proptypes.array,
  onClick: Proptypes.func,
};

export default CheckBoxes;
