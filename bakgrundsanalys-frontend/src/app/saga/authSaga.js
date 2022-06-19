import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { authActions } from "../reducers/authReducer";

export default function* authSaga() {
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
        yield put(authActions.fetchAuthSuccess(response.data));
      } else {
        yield put(authActions.fetchAuthFailure(response.data));
      }
    }
  } catch (e) {
    yield put(authActions.fetchAuthFailure(e));
  }
}
