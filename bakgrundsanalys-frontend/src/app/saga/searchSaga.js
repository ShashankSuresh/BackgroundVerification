import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { searchActions } from "../reducers/searchReducer";

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
        yield put(searchActions.fetchSearch(response.data));
      } else {
        yield put(searchActions.fetchSearchFailure(response.data));
      }
    }
  } catch (e) {
    yield put(searchActions.fetchSearchFailure(e));
  }
}
