import React, { useState } from "react";
import Chips from "@components/Chips";
import Div from "@components/Div";
import Span from "@components/Span";

export default {
  title: "Components/Chips",
};

export const ChipsDefault = () => {
  const [values1, setValues1] = useState(["On Hold"]);

  return <Chips value={values1} onChange={(e) => setValues1(e.value)} />;
};

export const ChipsTemplate = () => {
  const [values1, setValues1] = useState(["Complited"]);

  const customChip = (item) => {
    return (
      <Div>
        <Span>
          <Span light mr={2}>
            Status:
          </Span>
          {/* !important to be removed once changes done in Span component */}
          <Span color={"var(--grey) !important"}>{item}</Span>
        </Span>
      </Div>
    );
  };

  return (
    <Chips
      value={values1}
      onChange={(e) => setValues1(e.value)}
      max={5}
      itemTemplate={customChip}
    >
      {values1}
    </Chips>
  );
};
