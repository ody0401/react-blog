import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../reducers/user";
import axios from 'axios';

function signUpAPI(data) {
  return axios.post('/user',data)
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    })

  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function logInAPI (data) {
  return axios.post('/user/login', data)
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data)
    yield put({
      type:LOG_IN_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type:LOG_IN_FAILURE,
      error: error.response.data
    })
  }
}


function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}

function loadMyInfoAPI() {
  return axios.get('/user')
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI)
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo)
}

function logOutAPI() {
  return axios.post('/user/logout')
}

function* logOut() {
  try {
    const result = yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLoadMyInfo),
    fork(watchLogOut),
  ])
}