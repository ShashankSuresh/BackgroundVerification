import React, { useState } from "react";
import InputText from "@components/InputText";

export default {
  title: "Components/InputText",
};

const InputTextDemo = (props) => {
  const [value, setValue] = useState("");

  return (
    <InputText
      id="username"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

export const InputTextDefault = (args) => <InputTextDemo {...args} />;

export const InputTextPlaceholder = (args) => (
  <InputTextDemo
    width={[1 / 2]}
    placeholder="Personnummer (ååååmmddxxxx)"
    {...args}
  />
);
