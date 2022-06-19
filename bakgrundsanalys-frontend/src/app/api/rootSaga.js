import { takeLatest } from "@redux-saga/core/effects";

// Reducers
import { authActions } from "../reducers/authReducer";
import { servicesActions } from "../reducers/servicesReducer";

// Saga
import authSaga from "../saga/authSaga";
import servicesSaga from "../saga/servicesSaga";

export default function* rootSaga() {
  yield takeLatest(authActions.fetchAuth.type, authSaga);
  yield takeLatest(servicesActions.fetchServices.type, servicesSaga);
}
