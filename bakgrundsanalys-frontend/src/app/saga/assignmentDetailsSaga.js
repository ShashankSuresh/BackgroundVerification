import { call, put } from "redux-saga/effects";
import callAPI from "../api/axios";
import { assignmentDetailsActions } from "../reducers/assignmentDetailsReducer";

export default function* assignmentDetailsSaga() {
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
          assignmentDetailsActions.fetchAssignmentDetailsSuccess(response.data)
        );
      } else {
        yield put(
          assignmentDetailsActions.fetchAssignmentDetailsFailure(response.data)
        );
      }
    }
  } catch (e) {
    yield put(assignmentDetailsActions.fetchAssignmentDetailsFailure(e));
  }
}
