const Routes = {
  HOME: { URL: "/" },
  LOGIN: { URL: "/inlogg" },
  FORGOT_PASSWORD: { URL: "/glomt-losenord" },
  RESET_PASSWORD: { URL: "/aterstall-losenord" },
  REGISTER_ACCOUNT: { URL: "/registrera" },
  SEARCH: { URL: "/sok" },
  PAGE_NOT_FOUND: { URL: "/Sidan-kan-inte-hittas" },

  CHECKOUT: { URL: "/checkout" },
  ORDER_CONFIRMATION: { URL: "/bestallningsbekraftelse" },
  ORDER_RESULTS: { URL: "/rapport" },

  ADMIN_FORGOT_PASSWORD: { URL: "/admin/glomt-losenord", IS_ADMIN: true },
  ADMIN_RESET_PASSWORD: { URL: "/admin/aterstall-losenord", IS_ADMIN: true },
  ADMIN_LOGIN: { URL: "/admin/inlogg", IS_ADMIN: true },
  ADMIN_ORDER_DETAILS: { URL: "/admin/bestallningar/{id}", IS_ADMIN: true },
  ADMIN_USERS_LIST: { URL: "/admin/anvandare", IS_ADMIN: true },
  ADMIN_ORDERS_LIST: { URL: "/admin/bestallningar", IS_ADMIN: true },
  ADMIN_ASSIGNMENTS_LIST: { URL: "/admin/uppdrag", IS_ADMIN: true },
  ADMIN_CUSTOMERS: { URL: "/admin/kunder", IS_ADMIN: true },
  ADMIN_CREATE_CUSTOMER: { URL: "/admin/kunder/skapa-kund", IS_ADMIN: true },
  ASSIGNMENT_DETAILS: { URL: "/admin/uppdrag/detaljer", IS_ADMIN: true },
  CUSTOMER_DETAILS: { URL: "/admin/kunder/detaljer", IS_ADMIN: true },
  ADMIN_REGISTRATION_COMPLETED: {
    URL: "/admin/registrering-avslutad",
    IS_ADMIN: true,
  },
  ADMIN_FORGOT_PASSWORD_SUCCESSFUL: {
    URL: "/admin/losenordsaterstallning-lyckades",
    IS_ADMIN: true,
  },
  ADMIN_COMPLETE_REGISTRATION: {
    URL: "/admin/avsluta-registrering",
    IS_ADMIN: true,
  },

  REGISTRATION_SUCCESSFUL: { URL: "/registrering-lyckades" },
  REGISTER_WITH_BANKID: { URL: "/registrera-med-bankid" },
  USER_COMPLETE_REGISTRATION: { URL: "/avsluta-registrering" },
  USER_REGISTRATION_COMPLETED: { URL: "/registrering-avslutad" },
  USER_FORGOT_PASSWORD_SUCCESSFUL: { URL: "/losenordsaterstallning-lyckades" },

  USER_PROFILE: { URL: "/mittkonto/anvandarprofil" },
  ORDERS_LIST: { URL: "/mittkonto/bestallningar" },
  SUB_USERS_LIST: { URL: "/mittkonto/anvandare" },
  ORDERS_DETAILS: { URL: "/mittkonto/bestallningar/detaljer" },
  COMPANY_INFO: { URL: "/mittkonto/foretagsinformation" },
  USER_INFO: { URL: "/mittkonto/anvandarinformation" },
  ADMIN_MY_PROFILE: { URL: "/admin/anvandarprofil", IS_ADMIN: true },
};

export default Routes;
