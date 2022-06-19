import { combineReducers } from "redux";
import { assignmentDetailsReducer } from "./assignmentDetailsReducer";
import { assignmentListReducer } from "./assignmentListReducer";
import { authReducer } from "./authReducer";
import { customerDetailsReducer } from "./customerDetailsReducer";
import { customersListReducer } from "./customersListReducer";
import { orderDetailsReducer } from "./orderDetailsReducer";
import { orderListReducer } from "./orderListReducer";
import { orderSummaryReducer } from "./orderSummaryReducer";
import { ordersReducer } from "./ordersReducer";
import { searchReducer } from "./searchReducer";
import { userListReducer } from "./userListReducer";
import { servicesReducer } from "./servicesReducer";
import { personInformationReducer } from "./personInformationReducer";
import { klarnaReducer } from "./klarnaReducer";

export const rootReducer = combineReducers({
  assignmentDetailsReducer,
  assignmentListReducer,
  authReducer,
  customerDetailsReducer,
  customersListReducer,
  orderDetailsReducer,
  orderListReducer,
  orderSummaryReducer,
  ordersReducer,
  searchReducer,
  userListReducer,
  servicesReducer,
  personInformationReducer,
  klarnaReducer,
});
