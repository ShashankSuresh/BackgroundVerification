import Axios from "@app/api/axios";
import { formatDateAndTime } from "@utils/utils";
import {
  CUSTOMERS_API,
  ORDERS_API,
  ASSIGNMENTS_API,
  USERS_API,
  COMPANY,
} from "@utils/constant";

const listData = (screenName, payload) => {
  const getResponseBasedOnScreen = (responseData) => {
    switch (screenName) {
      case CUSTOMERS_API: {
        const customersData = responseData.map((customer) => {
          const status = customer.status ? "Active" : "Deleted";
          const companyName = customer.company
            ? customer.company
            : customer.name
            ? customer.name
            : "";
          return { ...customer, status: status, company: companyName };
        });
        return customersData;
      }
      case ORDERS_API: {
        const ordersData = responseData.map((order) => {
          const {
            customer = {},
            user = {},
            order_items: orderItems = [],
          } = order;
          const { name: subUser = "" } = user || {};
          const {
            type = "",
            company_name: company = "",
            name = "",
          } = customer || {};
          const customerName = name || "";
          const companyName = type === COMPANY ? company || "" : name || "";
          const ordersTotal = orderItems.length;
          const serviceName =
            ordersTotal > 1
              ? `${orderItems[0].name} + ${ordersTotal}`
              : orderItems[0].name;
          const createdAt = order.created_at
            ? formatDateAndTime(order.created_at)
            : "";
          const username = order.user ? order.user.name || "" : "";
          return {
            ...order,
            customer: companyName,
            service: serviceName,
            date: createdAt,
            username: username,
            subUser: subUser,
            customerName: customerName,
          };
        });
        return ordersData;
      }
      case ASSIGNMENTS_API: {
        const assignmentsData = responseData.map((assignment) => {
          const {
            created_at: createdAt = "",
            service: { name: serviceName = "" } = {},
            order = {},
            user = {},
          } = assignment || {};
          const { name = "" } = user || {};
          const { number: orderNumber = "" } = order || {};
          const date = createdAt ? formatDateAndTime(createdAt) : "";
          return {
            ...assignment,
            date: date || "",
            service: serviceName || "",
            order: orderNumber || "",
            assignment: name || "",
          };
        });
        return assignmentsData;
      }
      case USERS_API: {
        const usersData = responseData.map((user) => {
          const { name, role = [] } = user;
          const roleName = role.length ? role[0].name : "";
          return { ...user, user: name, role: roleName };
        });
        return usersData;
      }
    }
  };
  return Axios.get(screenName + payload).then((response) => {
    const { data, meta } = response.data;
    return { meta, data: getResponseBasedOnScreen(data) };
  });
};

export default listData;
