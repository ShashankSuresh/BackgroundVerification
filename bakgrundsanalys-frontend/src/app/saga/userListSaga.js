import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { userListActions } from "../reducers/userListReducer";

export default function* searchSaga() {
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
        yield put(userListActions.fetchUserListSuccess(response.data));
      } else {
        yield put(userListActions.fetchUserListFailure(response.data));
      }
    }
  } catch (e) {
    yield put(userListActions.fetchUserListFailure(e));
  }
}
