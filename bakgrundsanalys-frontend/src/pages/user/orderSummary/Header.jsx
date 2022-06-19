import React from "react";
import { H2 } from "@components/Heading";
import Div from "@components/Div";
import { useIntl } from "react-intl";

function Header() {
  const { messages } = useIntl();

  return (
    <Div
      py={22}
      pl={3}
      mb={3}
      backgroundColor={"rgba(var(--grey-lightest-rgba), 0.4)"}
    >
      <H2>{messages.title_label_order_summary}</H2>
    </Div>
  );
}

export default Header;
