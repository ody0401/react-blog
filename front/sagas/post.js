import axios from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_COMMENT_FAILURE, LOAD_COMMENT_REQUEST, LOAD_COMMENT_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_INFO_FAILURE, LOAD_POST_INFO_REQUEST, LOAD_POST_INFO_SUCCESS, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from "../reducers/post";


function uploadAPI(data) {
  console.log(data);
  return axios.post('/post/upload', data)
}

function* upload(action) {
  try {
    const result = yield call(uploadAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data
    }) 
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: error.response.data
    })
  }
}

function* watchUpload() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, upload);
}

function addPostAPI(data) {
  return axios.post('/post', data)
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error: error.response.data
    })
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function loadPostAPI() {
  return axios.get('/post/loadpost')
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POST_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function loadPostInfoAPI(data) {
  return axios.get(`/post/${data}`)
}

function* loadPostInfo(action) {
  try {
    const result = yield call(loadPostInfoAPI, action.data);
    yield put({
      type: LOAD_POST_INFO_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POST_INFO_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadPostInfo() {
  yield takeLatest(LOAD_POST_INFO_REQUEST, loadPostInfo);
}

function addCommentAPI(data) {
  return axios.post('/post/comment', data)
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    })    
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: error.response.data
    })
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadCommentAPI(data) {
  return axios.get(`/post/loadcomment/${data}`)
}

function* loadComment(action) {
  try {
    const result = yield call(loadCommentAPI, action.data)
    yield put({
      type: LOAD_COMMENT_SUCCESS,
      data: result.data
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: LOAD_COMMENT_FAILURE,
      error: error.response.data
    })
  }
}

function* watchLoadComment() {
  yield takeLatest(LOAD_COMMENT_REQUEST, loadComment);
}

export default function* postSaga() {
  yield all([
    fork(watchUpload),
    fork(watchAddPost),
    fork(watchLoadPost),
    fork(watchLoadPostInfo),
    fork(watchAddComment),
    fork(watchLoadComment),
  ])
}
