import { call, put } from "redux-saga/effects";
import services from "../services/services/servicesService";
import { authActions } from "../reducers/authReducer";

export default function* servicesSaga() {
  try {
    const response = yield call(services);
    if (response.status === 200) {
      if (response.data) {
        yield put(authActions.servicesInfo(response.data));
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}
