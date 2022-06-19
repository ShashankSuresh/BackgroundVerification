import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { assignmentListActions } from "../reducers/assignmentListReducer";

export default function* assignmentListSaga() {
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
          assignmentListActions.fetchAssignmentDetailsSuccess(response.data)
        );
      } else {
        yield put(
          assignmentListActions.fetchAssignmentDetailsFailure(response.data)
        );
      }
    }
  } catch (e) {
    yield put(assignmentListActions.fetchAssignmentDetailsFailure(e));
  }
}
