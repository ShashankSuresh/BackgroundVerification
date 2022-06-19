import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { orderListActions } from "../reducers/orderListReducer";

export default function* orderListSaga() {
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
        yield put(orderListActions.fetchOrderListSuccess(response.data));
      } else {
        yield put(orderListActions.fetchOrderListFailure(response.data));
      }
    }
  } catch (e) {
    yield put(orderListActions.fetchOrderListFailure(e));
  }
}
