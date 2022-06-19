import moment from "moment";
import {
  APPLICATION_NAME,
  TITLE_DIVIDER,
  CUSTOMER_USER,
  GUEST_USER,
  ADMIN,
  KLARNA_CHECKOUT,
  MANUAL_CHECKOUT,
  SORT_KEY_STATUS,
  SORT_KEY_NAME,
  SORT_KEY_COMPANY,
  SORT_KEY_CUSTOMER,
  SORT_KEY_SERVICE,
  SORT_KEY_ORDER,
  SORT_KEY_USER,
  SORT_KEY_IS_ACTIVE,
  SORT_KEY_FIRSTNAME,
  SORT_KEY_COMPANY_NAME,
  SORT_KEY_NUMBER,
  SORT_KEY_CREATED_AT,
  SORT_KEY_ASSIGNMENT,
  SORT_KEY_ASSIGNEE,
  SORT_KEY_ORDERS_COUNT,
  SORT_KEY_USERNAME,
  CUSTOMERS_API,
  ORDER_LIST,
  ADMIN_CUSTOMERS,
  ADMIN_ASSIGNMENTS,
  USERS_LIST,
  PAGE_NOT_FOUND,
  CUSTOMERS,
  USERS,
  ORDERS_API,
  ASSIGNMENTS_API,
  DASHBOARD,
  DASHBOARD_COMPANY,
  CUSTOMER,
} from "@utils/constant";
import RoutesList from "@shared/RoutesList";

export const addHyphenToNumber = (number, position) => {
  let value = number || "";
  const regEx = new RegExp(`(\\d{${position}})`, "g");
  value = value.replace(/([^0-9 -\s])/gm, "").replace(/\s+/g, "");
  value = value && value.replace(/([^0-9 -\s])/gm, "").replace(/\s+/g, "");
  if (value && (value.length > position + 1 || value.length < position + 1)) {
    value = value.replace(/-/g, "");
  }
  if (value && value.length > position && value.indexOf("-") !== position) {
    value = value.replace(regEx, "$1-");
  }
  return value;
};

export const setTitle = () => {
  const routePath = window.location.pathname.split("/");
  const routePathName = `/${routePath[routePath.length - 1]}`;
  const route = RoutesList.find((obj) => obj.url.includes(routePathName));
  if (route) {
    document.title = APPLICATION_NAME + TITLE_DIVIDER + route.title;
  }
};

const urlencode = new Map();
urlencode.set("%", "%2C");

export const omit = (keys, obj) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

export const encodeHTML = (arr, value) =>
  arr.length > 1 ? arr.join(urlencode.get(value)) : arr;

export const splitString = (str, value = "\n") =>
  str
    .split(value)
    .map((value) => value.trim())
    .filter((value) => value !== "");

const parseJwt = (token) => {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  return token;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    const jwtPayload = parseJwt(token);
    if (jwtPayload) {
      return jwtPayload.exp > +new Date() / 1000;
    }
  } catch (e) {
    throw new Error(e);
  }
  return false;
};

const isAdmin = () => location.pathname.includes(ADMIN);

export const getUserType = (isFreeAccount = false) => {
  if (!isAuthenticated()) {
    return {
      type: GUEST_USER,
      payment_method: KLARNA_CHECKOUT,
    };
  }

  if (isAuthenticated() && !isAdmin()) {
    return {
      type: CUSTOMER_USER,
      payment_method: isFreeAccount ? MANUAL_CHECKOUT : KLARNA_CHECKOUT,
    };
  }

  if (isAdmin()) {
    return {
      type: ADMIN,
      payment_method: MANUAL_CHECKOUT,
    };
  }
};

export const renderSnippet = (htmlSnippet) => {
  const checkoutContainer = document.getElementById("my-checkout-container");
  checkoutContainer.innerHTML = htmlSnippet;
  const scriptsTags = checkoutContainer.getElementsByTagName("script");
  for (let i = 0; i < scriptsTags.length; i += 1) {
    const { parentNode } = scriptsTags[i];
    const newScriptTag = document.createElement("script");
    newScriptTag.type = "text/javascript";
    newScriptTag.text = scriptsTags[i].text;
    parentNode.removeChild(scriptsTags[i]);
    parentNode.appendChild(newScriptTag);
  }
};

export const parseFilterParams = (element = []) => {
  let keys;
  let params = "";
  if (element && element[1]) {
    if (element[1] === true) {
      params = "filter=true";
    } else {
      keys = Object.keys(element[1]);
      if (keys.length) {
        params = `filter=${keys.map((obj) => obj).join(",")}&${keys
          .map(
            (obj) =>
              `${obj}=${element[1][obj]
                .map((ele) => encodeURIComponent(ele))
                .filter((o) => o !== "")
                .join(",")}`
          )
          .filter((o) => o !== "")
          .join("&")}`;
      }
    }
  }
  return params;
};

export const formatDateAndTime = (value = "") =>
  moment(value).format("DD-MM-YYYY, HH:MM");

export const formatDate = (value = "") => moment(value).format("YYYY-MM-DD");

export const getSortKey = (sortField, screenName) => {
  switch (sortField) {
    case SORT_KEY_STATUS:
      if (screenName === CUSTOMERS_API) return SORT_KEY_IS_ACTIVE;
      return SORT_KEY_STATUS;
    case SORT_KEY_NAME:
    case SORT_KEY_USER: {
      return SORT_KEY_FIRSTNAME;
    }
    case SORT_KEY_ORDERS_COUNT:
      return SORT_KEY_ORDERS_COUNT;
    case SORT_KEY_COMPANY:
      return SORT_KEY_COMPANY_NAME;
    case SORT_KEY_CUSTOMER:
      return SORT_KEY_CUSTOMER;
    case SORT_KEY_ASSIGNMENT:
      return SORT_KEY_ASSIGNEE;
    case SORT_KEY_SERVICE:
      return SORT_KEY_SERVICE;
    case SORT_KEY_ORDER:
      return SORT_KEY_NUMBER;
    case SORT_KEY_USERNAME:
      return SORT_KEY_USER;
    default:
      return SORT_KEY_CREATED_AT;
  }
};

export const getRedirectPage = (userInfo) => {
  const { permissions = [], type } = userInfo;
  const rights = Object.keys(permissions).map((obj) => {
    return obj;
  });
  switch (true) {
    case rights.includes("company-information"):
      return DASHBOARD_COMPANY;
    case type === CUSTOMER:
      return DASHBOARD;
    case rights.includes(CUSTOMERS):
      return ADMIN_CUSTOMERS;
    case rights.includes(ORDERS_API):
      return ORDER_LIST;
    case rights.includes(ASSIGNMENTS_API):
      return ADMIN_ASSIGNMENTS;
    case rights.includes(USERS):
      return USERS_LIST;
    default:
      return PAGE_NOT_FOUND;
  }
};
