import { useHistory as useReactDomHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Routes from "../shared/Routes";
import { ADMIN } from "@utils/constant";
import RoutesList from "@shared/RoutesList";

const {
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  PAGE_NOT_FOUND,
  ORDERS_LIST,
  ADMIN_LOGIN,
  ADMIN_FORGOT_PASSWORD,
  ADMIN_RESET_PASSWORD,
  ADMIN_ORDERS_LIST,
  ORDERS_DETAILS,
  ADMIN_ORDER_DETAILS,
  USER_INFO,
  COMPANY_INFO,
  ADMIN_CUSTOMERS,
  ADMIN_USERS_LIST,
  SUB_USERS_LIST,
} = Routes;

const COMMON_ROUTES = {
  LOGIN: {
    user: LOGIN.URL,
    admin: ADMIN_LOGIN.URL,
  },
  FORGOT_PASSWORD: {
    user: FORGOT_PASSWORD.URL,
    admin: ADMIN_FORGOT_PASSWORD.URL,
  },
  RESET_PASSWORD: {
    user: RESET_PASSWORD.URL,
    admin: ADMIN_RESET_PASSWORD.URL,
  },
  PAGE_NOT_FOUND: {
    user: PAGE_NOT_FOUND.URL,
    admin: PAGE_NOT_FOUND.URL,
  },
  ORDER_LIST: {
    user: ORDERS_LIST.URL,
    admin: ADMIN_ORDERS_LIST.URL,
  },
  USERS_LIST: {
    user: SUB_USERS_LIST.URL,
    admin: ADMIN_USERS_LIST.URL,
  },
  ORDERS_DETAILS: {
    user: ORDERS_DETAILS.URL,
    admin: ADMIN_ORDER_DETAILS.URL,
  },
  DASHBOARD: {
    user: USER_INFO.URL,
    admin: ADMIN_CUSTOMERS.URL,
  },
  DASHBOARD_COMPANY: {
    user: COMPANY_INFO.URL,
  },
};

const useHistory = () => {
  const history = useReactDomHistory();
  const location = useLocation();

  const push = (routeName) => {
    if (Object.keys(COMMON_ROUTES).includes(routeName)) {
      const isAdmin = location.pathname.includes(ADMIN);
      const { user, admin } = COMMON_ROUTES[routeName];
      return history.push(isAdmin === true ? admin : user);
    }
    const route = RoutesList.find((route) => {
      const { name = "PAGE_NOT_FOUND" } = route;
      if (name === routeName) {
        return route.url;
      }
    });
    return history.push(route ? route.url : Routes.PAGE_NOT_FOUND.URL);
  };

  return { push };
};

export default useHistory;
