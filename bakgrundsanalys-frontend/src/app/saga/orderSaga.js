import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { ordersActions } from "../reducers/ordersReducer";

export default function* orderSaga() {
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
        yield put(ordersActions.fetchOrdersSuccess(response.data));
      } else {
        yield put(ordersActions.fetchOrdersFailure(response.data));
      }
    }
  } catch (e) {
    yield put(ordersActions.fetchOrdersFailure(e));
  }
}
