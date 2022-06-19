import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { orderDetailsActions } from "../reducers/orderDetailsReducer";

export default function* orderDetailsSaga() {
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
        yield put(orderDetailsActions.fetchOrderDetailsSuccess(response.data));
      } else {
        yield put(orderDetailsActions.fetchOrderDetailsFailure(response.data));
      }
    }
  } catch (e) {
    yield put(orderDetailsActions.fetchOrderDetailsFailure(e));
  }
}
