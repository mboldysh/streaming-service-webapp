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
    case ActionsTypes.REQUEST_NEXT_TRACK: {
      return {
        ...state,
        isPlaying: false,
        isLoading: true,
      };
    }
    case ActionsTypes.PLAY_REQUEST_SUCCSESS: {
      return {
        ...state,
        currentTrack: { name: action.payload.name, url: action.payload.url },
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
    case ActionsTypes.CHANGE_TRACK: {
      return {
        ...state,
        currentTrack: action.payload.nextTrackName,
      };
    }
    default:
      return state;
  }
};
