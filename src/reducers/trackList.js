import ActionTypes from '../actions/actionTypes';

const initialState = {
  tracks: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TRACK_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.FETCH_TRACK_LIST_DONE: {
      const { tracks } = action.payload;
      return {
        ...state,
        tracks,
        isLoading: false,
      };
    }
    case ActionTypes.FETCH_TRACK_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.PLAY_REQUEST_SUCCSESS: {
      return {
        ...state,
        tracks: state.tracks.map(
          track =>
            track.name === action.payload.name
              ? { ...track, url: action.payload.url }
              : track
        ),
      };
    }
    default:
      return state;
  }
};
