import React from "react";
import { useIntl } from "react-intl";
import Proptypes from "prop-types";
import { H2 } from "@components/Heading";
import Div from "@components/Div";
import { TextLarge } from "@components/Text";

const Footer = (props) => {
  const { messages } = useIntl();
  const { isFreeAccount, totalprice } = props;

  return (
    <Div color={"var(--grey-dark)"} px={3} pb={3}>
      <Div display="flex" flexWrap="wrap" justifyContent="space-between">
        <H2>{messages.text_total_price}:</H2>
        {isFreeAccount ? (
          <Div display="flex" alignItems="center">
            <TextLarge textDecoration="line-through" mr={3}>{`SEK ${Math.round(
              totalprice
            )}`}</TextLarge>
            <H2>SEK 0</H2>
          </Div>
        ) : (
          <H2>{`SEK ${Math.round(totalprice)}`}</H2>
        )}
      </Div>
    </Div>
  );
};

Footer.propTypes = {
  totalprice: Proptypes.array,
  isFreeAccount: Proptypes.bool,
};

export default Footer;
