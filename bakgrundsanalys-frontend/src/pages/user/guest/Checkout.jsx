import React from "react";
import OrderSummary from "../orderSummary/OrderSummary";
import { useSelector } from "react-redux";

const initSelect = (personInfo, servicesInfo, isFreeAccount) => {
  return personInfo.map((item) => ({
    ...item,
    servicesInfo,
    isFreeAccount: isFreeAccount ? true : false,
  }));
};

const GuestCheckout = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const { customer = {} } = userInfo;
  const { free_account: isFreeAccount = false } = customer;
  const servicesInfo = useSelector(
    (state) => state.servicesReducer.servicesInfo
  );
  const personInfo = useSelector(
    (state) => state.personInformationReducer.personInfo
  );
  return (
    <OrderSummary
      orderSummaryProps={initSelect(personInfo, servicesInfo, isFreeAccount)}
    />
  );
};

export default GuestCheckout;
