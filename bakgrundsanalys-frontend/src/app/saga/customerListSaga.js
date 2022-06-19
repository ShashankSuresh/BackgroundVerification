import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { customerListActions } from "../reducers/customerListReducer";

export default function* customerListSaga() {
  try {
    const response = yield call(
      callAPI,
      "baseURL",
      "endPoints",
      "params",
      "requestMethod",
      "requestBody"
    );
    if (response.status === 200) {
      if (response.data) {
        yield put(customerListActions.fetchCustomerListSuccess(response.data));
      } else {
        yield put(customerListActions.fetchCustomerListFailure(response.data));
      }
    }
  } catch (e) {
    yield put(customerListActions.fetchCustomerListFailure(e));
  }
}
