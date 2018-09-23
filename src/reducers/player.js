import ActionsTypes from '../actions/actionTypes';

const initialState = {
  currentTrack: null,
  isLoading: false,
  isPlaying: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.PLAY_REQUEST: {
      return {
        ...state,
        currentTrack: action.trackName,
        isPlaying: false,
        isLoading: true,
      };
    }
    case ActionsTypes.PLAY_REQUEST_SUCCSESS: {
      return {
        ...state,
        currentTrack: action.payload.name,
        isLoading: false,
        isPlaying: false,
      };
    }
    case ActionsTypes.PLAY_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        isPlaying: false,
      };
    }
    case ActionsTypes.TOGGLE_PLAYER: {
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    }
    default:
      return state;
  }
};
