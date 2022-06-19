import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import Container from "@components/Container";
import { H2 } from "@components/Heading";
import { TextMediumWeight, TextLarge } from "@components/Text";
import Switch from "@components/Switches";
import Div from "@components/Div";
import { WRITE } from "@utils/constant";
import editCustomerInfoService from "@app/services/users/editCustomerInfoService";

const Credits = ({ customerId, permissions = {}, customerData = {} }) => {
  const { free_account: freeAccount = 0 } = customerData;
  const { messages } = useIntl();
  const [checked, setChecked] = useState(freeAccount);
  const [isLoading, setLoading] = useState(false);
  const handleChange = async (e) => {
    try {
      setLoading(true);
      setChecked(e.value);
      await editCustomerInfoService({
        id: customerId[0],
        free_account: e.value ? 1 : 0,
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Container m={"0px !important"}>
      <H2 my={3}>{messages.title_credits}</H2>
      <H2 my={4}>{messages.title_free_account}</H2>
      {isLoading ? (
        <H2>{messages.text_loading}...</H2>
      ) : (
        <>
          <Div display="flex" alignItems="center" mb={3}>
            {permissions && permissions.credits === WRITE && (
              <Switch checked={checked} onChange={handleChange} mr={3} />
            )}
            <TextMediumWeight>
              {checked
                ? messages.free_account_active
                : messages.free_account_deactivated}
            </TextMediumWeight>
          </Div>
          {permissions && permissions.credits === WRITE && (
            <TextLarge>{messages.description_credits}</TextLarge>
          )}
        </>
      )}
    </Container>
  );
};

Credits.propTypes = {
  customerId: PropTypes.string,
  permissions: PropTypes.object,
  customerData: PropTypes.object,
};
export default Credits;
