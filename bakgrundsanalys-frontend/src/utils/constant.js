import Routes from "@shared/Routes";
import messages_sv from "@translation/sv.json";

export const SVLANG = messages_sv;

export const HEADER_NAV = [
  {
    label: "Sök",
    value: "SEARCH",
    redirectTo: "/sok",
  },
  {
    label: "Vad är bakgrundsanalys",
    redirectTo: "https://bakgndanalys03.wpengine.com/about-us/",
    isWpPage: true,
  },
  {
    label: "Våra tjänster",
    redirectTo: "https://bakgndanalys03.wpengine.com/services/",
    isWpPage: true,
  },
  {
    label: "Kontakt",
    redirectTo: "https://bakgndanalys03.wpengine.com/contact-us/",
    isWpPage: true,
  },
  {
    label: "Nyheter",
    redirectTo: "https://bakgndanalys03.wpengine.com/blog/",
    isWpPage: true,
  },
];

export const ADMIN_NAV = [
  {
    label: "KUNDER",
    value: "customers",
    redirectTo: "/admin/kunder",
  },
  {
    label: "BESTÄLLNINGAR",
    value: "orders",
    redirectTo: "/admin/bestallningar",
  },
  {
    label: "UPPGIFT",
    value: "assignments",
    redirectTo: "/admin/uppdrag",
  },
  {
    label: "ANVÄNDARE",
    value: "users",
    redirectTo: "/admin/anvandare",
  },
  {
    label: "MITT KONTO",
    value: "users",
    redirectTo: "/admin/anvandarprofil",
  },
];

export const MYACCOUNTS_NAV = [
  {
    label: "FÖRETAGSINFO",
    value: "company-information",
    redirectTo: "/mittkonto/foretagsinformation",
  },
  {
    label: "MITT KONTO",
    value: "user-info",
    redirectTo: "/mittkonto/anvandarinformation",
  },
  {
    label: "ANVÄNDARE",
    value: "users",
    redirectTo: "/mittkonto/anvandare",
  },
  {
    label: "BESTÄLLNINGAR",
    value: "orders",
    redirectTo: "/mittkonto/bestallningar",
  },
];

export const HEADER_ADMIN_NAV = [
  {
    label: "Till Svensk Bakgrundsanalys",
    value: "SEARCH",
    redirectTo: "/sok",
  },
  {
    label: "Kontakt",
    redirectTo: "https://bakgndanalys03.wpengine.com/contact-us/",
    isWpPage: true,
  },
];

export const LANGUAGES = ["Eng", "Swe"];

export const ROUTES = Routes;

export const INPUT = {
  NAME: {
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirm_password",
    NAME: "firstname",
    LAST_NAME: "lastname",
    PHONE: "phone",
    COMPANY_NAME: "company_name",
    COMPANY_NUMBER: "registration_nr",
    COMPANY_VAT: "tax_nr",
    COMPANY_ADDRESS: "company_address",
    CURRENT_PASSWORD: "current_password",
    ROLE: "role",
    SERVICES: "services",
    SUB_USER: "subUser",
    CUSTOMER: "customer",
    PERSONAL_NUMBER: "personal_number",
  },
  TYPE: {
    TEXT: "text",
    PASSWORD: "password",
    NUMBER: "number",
  },
};

export const APPLICATION_NAME = "SVENSK BAKGRUNDSANALYS";
export const TITLE_DIVIDER = " | ";

export const ORDER_SUMMARY_CONTENT = {
  PERSON: "Person:",
  RAPPORT: "Rapport:",
};

export const PAGE_NOT_FOUND_CODE = 404;

export const FILE_SIZE_LIMIT = 2000000;

export const ACCEPT_FILE_TYPES = [
  ".doc",
  ".docx",
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

export const ADMIN = "admin";

export const AUTH = "auth";

export const USERS = "users";

export const CUSTOMERS = "customers";

export const CUSTOMER = "customer";

export const INDIVIDUAL = "individual";

export const COMPANY = "company";

export const FORGOTPASSWORD = "forgot-password";

export const RESETPASSWORD = "reset-password";

export const REGISTER_ACCOUNT = "REGISTER_ACCOUNT";

export const LOGIN = "LOGIN";

export const REGISTER_WITH_BANKID = "REGISTER_WITH_BANKID";

export const PERSON_INFORMATION = "person-information?ssnnumber=";

export const SSNNUMBER = "ssnnumber";

export const DASHBOARD = "DASHBOARD";

export const DASHBOARD_COMPANY = "DASHBOARD_COMPANY";

export const REGISTRATION_SUCCESSFUL = "REGISTRATION_SUCCESSFUL";

export const SINGLE = "single";

export const MULTIPLE = "multiple";

export const SERVICES = "services";

export const ORDERS_DETAILS = "ORDERS_DETAILS";

export const CHECKOUT = "CHECKOUT";

export const ORDER_CONFIRMATION = "ORDER_CONFIRMATION";

export const STATUS_VALUES = [
  "active",
  "deleted",
  "paid",
  "not-paid",
  "cancelled",
  "waiting",
  "in-progress",
  "completed",
  "expired",
  "new",
  "not-assigned",
];

export const ORDER_RESULTS = "ORDER_RESULTS";

export const HOME = "HOME";

export const FORGOT_PASSWORD = "FORGOT_PASSWORD";

export const RESET_PASSWORD = "RESET_PASSWORD";

export const SEARCH = "SEARCH";

export const USER_PROFILE = "USER_PROFILE";

export const CUSTOMER_DETAILS = "CUSTOMER_DETAILS";

export const ASSIGNMENT_DETAILS = "ASSIGNMENT_DETAILS";

export const PAGE_NOT_FOUND = "PAGE_NOT_FOUND";

export const ADMIN_CUSTOMERS = "ADMIN_CUSTOMERS";

export const ADMIN_USERS = "ADMIN_USERS";

export const ADMIN_ORDERS = "ADMIN_ORDERS";

export const ADMIN_ASSIGNMENTS = "ADMIN_ASSIGNMENTS";

export const ADMIN_ORDER_DETAILS = "ADMIN_ORDER_DETAILS";

export const COMPANY_INFO = "COMPANY_INFO";

export const USER_INFO = "USER_INFO";

export const SUB_USERS = "SUB_USERS";

export const ORDERS = "ORDERS";

export const USER_REGISTRATION_COMPLETED = "USER_REGISTRATION_COMPLETED";

export const ADMIN_REGISTRATION_COMPLETED = "ADMIN_REGISTRATION_COMPLETED";

export const USER_FORGOT_PASSWORD_SUCCESSFUL =
  "USER_FORGOT_PASSWORD_SUCCESSFUL";

export const ADMIN_FORGOT_PASSWORD_SUCCESSFUL =
  "ADMIN_FORGOT_PASSWORD_SUCCESSFUL";

export const USER_COMPLETE_REGISTRATION = "USER_COMPLETE_REGISTRATION";

export const ADMIN_COMPLETE_REGISTRATION = "ADMIN_COMPLETE_REGISTRATION";

export const INITIALIZE_KLARNA = "initialize-klarna";

export const CUSTOMER_USER = "customer";

export const GUEST_USER = "guest";

export const KLARNA_CHECKOUT = "klarna_checkout";

export const MANUAL_CHECKOUT = "manual";

export const ORDERS_GUEST = "orders-guest";

export const CUSTOMER_INFORMATION = "customers?id=";

export const ADMIN_CREATE_CUSTOMER = "ADMIN_CREATE_CUSTOMER";

export const ASSIGNMENTS_API = "assignments";

export const CUSTOMERS_API = "customers";

export const ORDERS_API = "orders";

export const USERS_API = "users";

export const CUSTOMER_ORDERS_API = "orders?customer_id=";

export const ROLES = "roles";

export const ORDERS_KLARNA = "order-klarna";

export const SORT_KEY_STATUS = "status";

export const SORT_KEY_NAME = "name";

export const SORT_KEY_COMPANY = "company";

export const SORT_KEY_CUSTOMER = "customer";

export const SORT_KEY_SERVICE = "service";

export const SORT_KEY_ORDER = "order";

export const SORT_KEY_USER = "user";

export const SORT_KEY_EMAIL = "email";

export const SORT_KEY_PHONE = "phone";

export const SORT_KEY_IS_ACTIVE = "is_active";

export const SORT_KEY_FIRSTNAME = "firstname";

export const SORT_KEY_COMPANY_NAME = "company_name";

export const SORT_KEY_NUMBER = "number";

export const SORT_KEY_CREATED_AT = "created_at";

export const SORT_KEY_ASSIGNMENT = "assignment";

export const SORT_KEY_ASSIGNEE = "assignee";

export const SORT_KEY_ORDERS_COUNT = "orders_count";

export const SORT_KEY_USERNAME = "username";

export const READ = "read";

export const WRITE = "write";

export const USERS_LIST = "USERS_LIST";

export const ORDER_LIST = "ORDER_LIST";

export const STATUS_COMPLETED = "completed";

export const STATUS_PAID = "paid";

export const STATUS_NOT_PAID = "not-paid";

export const STATUS_IN_PROGRESS = "in-progress";

export const STATUS_CANCELLED = "cancelled";

export const STATUS_EXPIRED = "expired";

export const STATUS_NEW = "new";

export const STATUS_ERROR = "error";

export const STATUS_FAILED = "failed";

export const REPORT = "report";

export const DELETED = "Deleted";

export const REPORTS = "reports";

export const ADDRESS = "address";

export const MARITIAL_STATUS = "maritial_status";

export const ANALYSIS = "analysis";

export const ADMIN_MY_PROFILE = "ADMIN_MY_PROFILE";

export const RESEND_USER_EMAIL = "resend-invitation-email";

export const RESEND_ASSIGNMENT_EMAIL = "resend-assignment-email";
