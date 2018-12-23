import ActionTypes from '../actions/actionTypes';

const initialState = {
  isUploading: false,
  isDownloading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DOWNLOAD_START: {
      return {
        ...state,
        isDownloading: true,
      };
    }
    case ActionTypes.DOWNLOAD_FINISHED: {
      return {
        ...state,
        isDownloading: false,
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
