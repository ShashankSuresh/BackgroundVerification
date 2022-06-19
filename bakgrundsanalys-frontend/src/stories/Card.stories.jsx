import React from "react";
import { CheckBoxServices } from "./Checkbox.stories";
import Card from "@components/Card";
import Div from "@components/Div";
import Span from "@components/Span";

export default {
  title: "components/Card",
};

const contentText = [
  {
    title: "Name:",
    value: "Ehsan Fadakar",
  },
  {
    title: "Municipality:",
    value: "Stockholm",
  },
  {
    title: "County:",
    value: "Stockholms län",
  },
  {
    title: "Registration address:",
    value: "Skeppargatan 21 A lgh 1101 114 52 Stockholm",
  },
];

export const CardExample1 = () => (
  <Card
    mr={[0, 4]}
    mb={[4, 0]}
    title="Info"
    width={[1, 1, 1 / 2]}
    p={4}
    color={"var(--grey-dark)"}
  >
    <Div>
      <ul>
        {contentText.map((values, key) => (
          <li key={key}>
            <Span display={"inline-block"} pb={3}>
              {values.title}
            </Span>
            <Span mt={2}>{values.value}</Span>
          </li>
        ))}
      </ul>
    </Div>
  </Card>
);

export const CardExample2 = () => (
  <Card
    width={[1, 1, 1 / 2]}
    title="Security analysis is available!"
    p={4}
    color={"var(--grey-dark)"}
  >
    <Div fontSize={"var(--fs-milli)"}>
      <Div mt={2}>
        <CheckBoxServices label="Security" />
      </Div>
      <Div mt={4}>
        <CheckBoxServices label="Analysis" />
      </Div>
    </Div>
  </Card>
);
