import ActionTypes from '../actions/actionTypes';

const initialState = {
  isUploading: false,
  isDownloadig: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DOWNLOAD_START: {
      return {
        ...state,
        isDownloadig: true,
      };
    }
    case ActionTypes.DOWNLOAD_FINISHED: {
      return {
        ...state,
        isDownloadig: false,
      };
    }
    case ActionTypes.UPLOUD_START: {
      return {
        ...state,
        isUploading: true,
      };
    }
    case ActionTypes.UPLOAD_FINISHED: {
      return {
        ...state,
        isUploading: false,
      };
    }
    default:
      return state;
  }
};
