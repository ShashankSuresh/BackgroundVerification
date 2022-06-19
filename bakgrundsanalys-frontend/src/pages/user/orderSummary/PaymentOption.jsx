import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PrimaryButton } from "@components/Button";
import { klarnaActions } from "@app/reducers/klarnaReducer";
import { fetchResults } from "../../shared/CreateOrder";
import { ROUTES } from "@utils/constant";

function PaymentOption(prop) {
  const { messages } = useIntl();
  const history = useHistory();

  const dispatch = useDispatch();

  const {
    guestUserProps = { email: "", tax_nr: "" },
    disabled = false,
    htmlSnippet,
    isFreeAccount = false,
  } = prop;

  const personInfo = useSelector(
    (state) => state.personInformationReducer.personInfo
  );
  const servicesInfo = useSelector(
    (state) => state.servicesReducer.servicesInfo
  );

  const payload = personInfo.map((value) => {
    return {
      service_id: servicesInfo[0].id,
      personal_number: value.ssn,
      person_name: value.name,
    };
  });

  const handleSubmit = async () => {
    try {
      const response = await fetchResults(
        payload,
        guestUserProps,
        isFreeAccount
      );
      if (!isFreeAccount) {
        const {
          data = [],
          data: {
            klarna: { original = {} },
          },
        } = response;
        dispatch(klarnaActions.klarnaInfo(original));
        dispatch(klarnaActions.ordersInfo(data));
        htmlSnippet?.(original);
      } else {
        history.push(ROUTES.ORDER_CONFIRMATION.URL, {
          isFreeAccount: isFreeAccount,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <PrimaryButton
      py={2}
      px={4}
      disabled={disabled}
      width={[1, "auto"]}
      label={
        isFreeAccount
          ? messages.label_create_order
          : messages.label_pay_by_klarna
      }
      onClick={handleSubmit}
    />
  );
}

export default PaymentOption;
