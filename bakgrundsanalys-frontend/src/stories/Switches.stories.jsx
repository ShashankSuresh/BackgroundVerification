import React, { useState } from "react";
import Switch from "@components/Switches";

export default {
  title: "Components/Switches",
};

const SwitchDemo = (props) => {
  const [checked, setChecked] = useState(true);

  return (
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.value)}
      {...props}
    />
  );
};

export const SwitchChecked = () => <SwitchDemo />;
export const SwitchCheckedFalse = () => <SwitchDemo checked={false} />;
export const SwitchDisabled = () => <SwitchDemo disabled />;
