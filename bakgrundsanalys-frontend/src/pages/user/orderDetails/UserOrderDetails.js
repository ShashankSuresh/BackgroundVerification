import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderDetails from "../../shared/orderDetails/OrderDetails";
import { ROUTES } from "@utils/constant";
import getDetails from "@app/services/orders/getOrderDetails";

const UserOrderDetails = () => {
  const { search = "" } = useLocation();
  const { id: orderId = "" } = queryString.parse(search);
  const [orderData, setOrderData] = useState({});
  const userInfo = useSelector((state) => state.authReducer.userInfo);
  const {
    customer: { id: customerId = "" },
  } = userInfo;

  const getOrderDetails = () => {
    getDetails(orderId).then(
      (res) => {
        setOrderData(res);
      },
      (e) => {
        throw new Error(e);
      }
    );
  };

  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <OrderDetails
        orderSummaryProps={orderData}
        redirectTo={ROUTES.ORDERS_LIST.URL}
        customerId={customerId}
        isCustomer
      />
    </>
  );
};

export default UserOrderDetails;
