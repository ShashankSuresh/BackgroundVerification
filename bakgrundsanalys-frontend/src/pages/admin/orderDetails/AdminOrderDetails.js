import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import OrderDetails from "../../shared/orderDetails/OrderDetails";
import { ROUTES } from "@utils/constant";
import orderDetails from "@app/services/orders/getOrderDetails";

const AdminOrderDetails = () => {
  const { search = "" } = useLocation();
  const { id: orderId = "" } = queryString.parse(search);
  const [orderData, setOrderData] = useState({});

  const getOrderDetails = () => {
    orderDetails(orderId).then(
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
        redirectTo={ROUTES.ADMIN_ORDERS_LIST.URL}
      />
    </>
  );
};

export default AdminOrderDetails;
