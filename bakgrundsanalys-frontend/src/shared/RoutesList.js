import {
  SVLANG,
  ROUTES,
  LOGIN,
  REGISTER_ACCOUNT,
  REGISTER_WITH_BANKID,
  ORDERS_DETAILS,
  CHECKOUT,
  ORDER_CONFIRMATION,
  ORDER_RESULTS,
  SEARCH,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  HOME,
  USER_PROFILE,
  CUSTOMER_DETAILS,
  REGISTRATION_SUCCESSFUL,
  PAGE_NOT_FOUND,
  ADMIN_CUSTOMERS,
  ASSIGNMENT_DETAILS,
  ADMIN_ORDER_DETAILS,
  ADMIN_ASSIGNMENTS,
  ADMIN_ORDERS,
  ADMIN_USERS,
  ORDERS,
  SUB_USERS,
  USER_INFO,
  COMPANY_INFO,
  ADMIN_COMPLETE_REGISTRATION,
  USER_COMPLETE_REGISTRATION,
  ADMIN_FORGOT_PASSWORD_SUCCESSFUL,
  USER_FORGOT_PASSWORD_SUCCESSFUL,
  ADMIN_REGISTRATION_COMPLETED,
  USER_REGISTRATION_COMPLETED,
  ADMIN_CREATE_CUSTOMER,
  ADMIN_MY_PROFILE,
} from "@utils/constant";
import Search from "@pages/user/search/Search";
import AdminLogin from "@pages/admin/AdminLogin";
import UserLogin from "@pages/user/UserLogin";
import AdminForgotPassword from "@pages/admin/AdminForgotPassword";
import UserForgotPassword from "@pages/user/UserForgotPassword";
import ResetPassword from "@pages/auth/resetPassword/ResetPassword";
import RegisterAccount from "@pages/auth/registerAccount/RegisterAccount";
import UserProfile from "@pages/user/userProfile/UserProfile";
import PageNotFound from "@pages/shared/PageNotFound";
import CustomerDetails from "@pages/admin/customers/Details";
import Features from "@pages/shared/Features";
import Services from "@pages/shared/Services";
import BankRegister from "@pages/auth/registerAccount/bank/BankRegister";
import CustomerList from "@pages/admin/customers/list";
import UsersList from "@pages/admin/users/list";
import OrdersList from "@pages/admin/orders/list";
import AssignmentsList from "@pages/admin/assignments/list";
import AdminOrderDetails from "@pages/admin/orderDetails/AdminOrderDetails";
import AssignmentDetails from "@pages/admin/assignments/Details";
import OrderDetails from "@pages/user/orderDetails/UserOrderDetails";
import CompanyInfo from "@pages/user/userProfile/company/CompanyInfo";
import UserInfo from "@pages/user/userProfile/private/UserInfo";
import GuestCheckout from "@pages/user/guest/Checkout";
import GuestOrderConfirmation from "@pages/user/guest/OrderConfirmation";
import RegistrationSuccessful from "@pages/shared/RegistrationSuccessful";
import UserRegistrationCompleted from "@pages/user/UserRegistrationCompleted";
import AdminRegistrationCompleted from "@pages/admin/AdminRegistrationCompleted";
import UserForgotPasswordSuccessful from "@pages/user/UserForgotPasswordSuccessful";
import AdminForgotPasswordSuccessful from "@pages/admin/AdminForgotPasswordSuccessful";
import UserCompleteRegistration from "@pages/user/UserCompleteRegistration";
import AdminCompleteRegistration from "@pages/admin/AdminCompleteRegistration";
import SubUsers from "@pages/user/SubUsers";
import OrderResults from "@pages/user/OrderResults/OrderResults";
import CreateCustomer from "@pages/admin/customers/Create";
import CustomerOrdersList from "@pages/user/orders/list";
import AdminMyProfile from "@pages/admin/myProfile/UserInfo";

export const RoutesList = [
  {
    name: HOME,
    url: ROUTES.HOME.URL,
    title: SVLANG.search_text,
    component: [Search, Services, Features],
  },
  {
    name: LOGIN,
    url: ROUTES.LOGIN.URL,
    title: SVLANG.login,
    component: [UserLogin],
  },
  {
    name: FORGOT_PASSWORD,
    url: ROUTES.FORGOT_PASSWORD.URL,
    title: SVLANG.title_forgot_password,
    component: [UserForgotPassword],
  },
  {
    name: RESET_PASSWORD,
    url: ROUTES.RESET_PASSWORD.URL,
    title: SVLANG.label_set_password,
    component: [ResetPassword],
  },
  {
    name: REGISTER_ACCOUNT,
    url: ROUTES.REGISTER_ACCOUNT.URL,
    title: SVLANG.title_registration,
    component: [RegisterAccount],
  },
  {
    name: SEARCH,
    url: ROUTES.SEARCH.URL,
    title: SVLANG.search_text,
    component: [Search, Services, Features],
  },
  {
    name: USER_PROFILE,
    url: ROUTES.USER_PROFILE.URL,
    title: SVLANG.title_my_profile,
    component: [UserProfile],
    showSidemenu: true,
  },
  {
    name: LOGIN,
    url: ROUTES.ADMIN_LOGIN.URL,
    title: SVLANG.login,
    component: [AdminLogin],
    isAdmin: ROUTES.ADMIN_LOGIN.IS_ADMIN,
  },
  {
    name: FORGOT_PASSWORD,
    url: ROUTES.ADMIN_FORGOT_PASSWORD.URL,
    title: SVLANG.title_forgot_password,
    component: [AdminForgotPassword],
    isAdmin: ROUTES.ADMIN_RESET_PASSWORD.IS_ADMIN,
  },
  {
    name: RESET_PASSWORD,
    url: ROUTES.ADMIN_RESET_PASSWORD.URL,
    title: SVLANG.label_set_password,
    component: [ResetPassword],
    isAdmin: ROUTES.ADMIN_RESET_PASSWORD.IS_ADMIN,
  },
  {
    name: REGISTRATION_SUCCESSFUL,
    url: ROUTES.REGISTRATION_SUCCESSFUL.URL,
    title: SVLANG.title_registration,
    component: [RegistrationSuccessful],
  },
  {
    name: CUSTOMER_DETAILS,
    url: ROUTES.CUSTOMER_DETAILS.URL,
    title: SVLANG.title_customers,
    component: [CustomerDetails],
    isAdmin: ROUTES.CUSTOMER_DETAILS.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: REGISTER_WITH_BANKID,
    url: ROUTES.REGISTER_WITH_BANKID.URL,
    title: SVLANG.title_customers,
    component: [BankRegister],
  },
  {
    name: ASSIGNMENT_DETAILS,
    url: ROUTES.ASSIGNMENT_DETAILS.URL,
    title: SVLANG.title_assignments,
    component: [AssignmentDetails],
    isAdmin: ROUTES.ASSIGNMENT_DETAILS.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: PAGE_NOT_FOUND,
    url: ROUTES.PAGE_NOT_FOUND.URL,
    title: SVLANG.title_pagenotfound,
    component: [PageNotFound],
  },
  {
    name: ADMIN_CUSTOMERS,
    url: ROUTES.ADMIN_CUSTOMERS.URL,
    title: SVLANG.title_customers,
    component: [CustomerList],
    isAdmin: ROUTES.ADMIN_CUSTOMERS.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ADMIN_CREATE_CUSTOMER,
    url: ROUTES.ADMIN_CREATE_CUSTOMER.URL,
    title: SVLANG.title_customers,
    component: [CreateCustomer],
    isAdmin: ROUTES.ADMIN_CREATE_CUSTOMER.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ADMIN_USERS,
    url: ROUTES.ADMIN_USERS_LIST.URL,
    title: SVLANG.title_users,
    component: [UsersList],
    isAdmin: ROUTES.ADMIN_USERS_LIST.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ADMIN_ORDERS,
    url: ROUTES.ADMIN_ORDERS_LIST.URL,
    title: SVLANG.title_orders,
    component: [OrdersList],
    isAdmin: ROUTES.ADMIN_ORDERS_LIST.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ADMIN_ASSIGNMENTS,
    url: ROUTES.ADMIN_ASSIGNMENTS_LIST.URL,
    title: SVLANG.title_assignments,
    component: [AssignmentsList],
    isAdmin: ROUTES.ADMIN_ASSIGNMENTS_LIST.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ADMIN_ORDER_DETAILS,
    url: ROUTES.ADMIN_ORDER_DETAILS.URL,
    title: SVLANG.title_orders,
    component: [AdminOrderDetails],
    isAdmin: ROUTES.ADMIN_ORDER_DETAILS.IS_ADMIN,
    showSidemenu: true,
  },
  {
    name: ORDERS_DETAILS,
    url: ROUTES.ORDERS_DETAILS.URL,
    title: SVLANG.title_orders,
    component: [OrderDetails],
    showSidemenu: true,
  },
  {
    name: COMPANY_INFO,
    url: ROUTES.COMPANY_INFO.URL,
    title: SVLANG.label_company_info,
    component: [CompanyInfo],
    showSidemenu: true,
  },
  {
    name: USER_INFO,
    url: ROUTES.USER_INFO.URL,
    title: SVLANG.title_user_info,
    component: [UserInfo],
    showSidemenu: true,
  },
  {
    name: SUB_USERS,
    url: ROUTES.SUB_USERS_LIST.URL,
    title: SVLANG.title_user_info,
    component: [SubUsers],
    showSidemenu: true,
  },
  {
    name: ORDERS,
    url: ROUTES.ORDERS_LIST.URL,
    title: SVLANG.title_orders,
    component: [CustomerOrdersList],
    showSidemenu: true,
  },
  {
    name: CHECKOUT,
    url: ROUTES.CHECKOUT.URL,
    title: SVLANG.title_checkout,
    component: [GuestCheckout],
  },
  {
    name: ORDER_CONFIRMATION,
    url: ROUTES.ORDER_CONFIRMATION.URL,
    title: SVLANG.title_order_confirmation,
    component: [GuestOrderConfirmation],
  },
  {
    name: USER_REGISTRATION_COMPLETED,
    url: ROUTES.USER_REGISTRATION_COMPLETED.URL,
    title: SVLANG.title_registration_completed,
    component: [UserRegistrationCompleted],
  },
  {
    name: ADMIN_REGISTRATION_COMPLETED,
    url: ROUTES.ADMIN_REGISTRATION_COMPLETED.URL,
    title: SVLANG.title_registration_completed,
    component: [AdminRegistrationCompleted],
    isAdmin: ROUTES.ADMIN_REGISTRATION_COMPLETED.IS_ADMIN,
  },
  {
    name: USER_FORGOT_PASSWORD_SUCCESSFUL,
    url: ROUTES.USER_FORGOT_PASSWORD_SUCCESSFUL.URL,
    title: SVLANG.title_forgot_password_successful,
    component: [UserForgotPasswordSuccessful],
  },
  {
    name: ADMIN_FORGOT_PASSWORD_SUCCESSFUL,
    url: ROUTES.ADMIN_FORGOT_PASSWORD_SUCCESSFUL.URL,
    title: SVLANG.title_forgot_password_successful,
    component: [AdminForgotPasswordSuccessful],
    isAdmin: ROUTES.ADMIN_FORGOT_PASSWORD_SUCCESSFUL.IS_ADMIN,
  },
  {
    name: USER_COMPLETE_REGISTRATION,
    url: ROUTES.USER_COMPLETE_REGISTRATION.URL,
    title: SVLANG.title_complete_registration,
    component: [UserCompleteRegistration],
  },
  {
    name: ADMIN_COMPLETE_REGISTRATION,
    url: ROUTES.ADMIN_COMPLETE_REGISTRATION.URL,
    title: SVLANG.title_complete_registration,
    component: [AdminCompleteRegistration],
    isAdmin: ROUTES.ADMIN_COMPLETE_REGISTRATION.IS_ADMIN,
  },
  {
    name: ORDER_RESULTS,
    url: ROUTES.ORDER_RESULTS.URL,
    title: SVLANG.title_complete_order_results,
    component: [OrderResults],
  },
  {
    name: ADMIN_MY_PROFILE,
    url: ROUTES.ADMIN_MY_PROFILE.URL,
    title: SVLANG.title_complete_order_results,
    component: [AdminMyProfile],
    showSidemenu: true,
    isAdmin: ROUTES.ADMIN_MY_PROFILE.IS_ADMIN,
  },
];

export default RoutesList;
