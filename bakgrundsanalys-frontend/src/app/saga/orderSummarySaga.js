import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { orderSummaryActions } from "../reducers/orderSummaryReducer";

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
        yield put(orderSummaryActions.fetchOrderSummarySuccess(response.data));
      } else {
        yield put(orderSummaryActions.fetchOrderSummaryFailure(response.data));
      }
    }
  } catch (e) {
    yield put(orderSummaryActions.fetchOrderSummaryFailure(e));
  }
}
