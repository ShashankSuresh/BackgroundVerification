import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { customerDetailsActions } from "../reducers/customerDetailsReducer";

export default function* customerDetailsSaga() {
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
        yield put(
          customerDetailsActions.fetchCustomerDetailsSuccess(response.data)
        );
      } else {
        yield put(
          customerDetailsActions.fetchCustomerDetailsFailure(response.data)
        );
      }
    }
  } catch (e) {
    yield put(customerDetailsActions.fetchCustomerDetailsFailure(e));
  }
}
