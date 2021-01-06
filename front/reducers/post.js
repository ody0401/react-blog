import produce from "immer";

const initialState = {
  uploadImageLoading: false, //
  uploadImageDone: false,
  uploadImageError: null,
  uploadImageResult: null,
  addPostLoading: false, //
  addPostDone: false,
  addPostError: null,
  addPostResult: null,
  addCommentLoading: false, //
  addCommentDone: false,
  addCommentError: null,
  addCommentResult: null,
  loadCommentLoading: false, //
  loadCommentDone: false,
  loadCommentError: null,
  loadCommentResult: [],
  loadPostLoading: false, //
  loadPostDone: false,
  loadPostError: null,
  loadPostResult: [],
  loadPostInfoLoading: false, //
  loadPostInfoDone: false,
  loadPostInfoError: null,
  loadPostInfoResult: [],
};

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const LOAD_POST_INFO_REQUEST = "LOAD_POST_INFO_REQUEST";
export const LOAD_POST_INFO_SUCCESS = "LOAD_POST_INFO_SUCCESS";
export const LOAD_POST_INFO_FAILURE = "LOAD_POST_INFO_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPLOAD_IMAGE_REQUEST:
        draft.uploadImageLoading = true;
        draft.uploadImageDone = false;
        draft.uploadImageError = null;
        break;
      case UPLOAD_IMAGE_SUCCESS:
        draft.uploadImageLoading = false;
        draft.uploadImageDone = true;
        draft.uploadImageResult = action.data;
        break;
      case UPLOAD_IMAGE_FAILURE:
        draft.uploadImageLoading = false;
        draft.uploadImageError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostResult = action.data;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        draft.addCommentResult = action.data;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      case LOAD_COMMENT_REQUEST:
        draft.loadCommentLoading = true;
        draft.loadCommentDone = false;
        draft.loadCommentError = null;
        break;
      case LOAD_COMMENT_SUCCESS:
        draft.loadCommentLoading = false;
        draft.loadCommentDone = true;
        draft.loadCommentResult = action.data;
        break;
      case LOAD_COMMENT_FAILURE:
        draft.loadCommentLoading = false;
        draft.loadCommentError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostResult = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostError = action.error;
        draft.loadPostLoading = false;
        break;
      case LOAD_POST_INFO_REQUEST:
        draft.loadPostInfoLoading = true;
        draft.loadPostInfoDone = false;
        draft.loadPostInfoError = null;
        break;
      case LOAD_POST_INFO_SUCCESS:
        draft.loadPostInfoLoading = false;
        draft.loadPostInfoDone = true;
        draft.loadPostInfoResult = action.data;
        break;
      case LOAD_POST_INFO_FAILURE:
        draft.loadPostInfoError = action.error;
        draft.loadPostInfoLoading = false;
        break;
      default:
        break;
    }
  });

export default reducer;
