import React, { useState } from "react";
import Proptypes from "prop-types";
import Checkbox from "@components/Checkbox";
import Label from "@components/Label";

export default {
  title: "Components/CheckBox",
};

export const CheckboxServices = (props) => {
  const [checked, setChecked] = useState(false);

  const { id, label } = props;

  return (
    <>
      <Checkbox
        inputId={id}
        checked={checked}
        onChange={(e) => setChecked(e.checked)}
        {...props}
      />
      <Label htmlFor={id} ml={10}>
        {label}
      </Label>
    </>
  );
};

CheckboxServices.propTypes = {
  id: Proptypes.bool,
  label: Proptypes.string,
};

export const CheckBoxServices = (args) => <CheckboxServices {...args} />;
export const CheckBoxServicesDisabled = () => (
  <CheckboxServices disabled id="chkboxservices-2" />
);
export const CheckBoxServicesLabel = () => (
  <CheckboxServices id="chkboxservices-2" label="Label" />
);
