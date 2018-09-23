import * as api from '../api';
import actioTypes from './actionTypes';

export const onPlay = trackName => dispatch => {
  dispatch({ type: actioTypes.PLAY_REQUEST, payload: trackName });

  api
    .getPresignUrl(trackName)
    .then(data => {
      dispatch({
        type: actioTypes.PLAY_REQUEST_SUCCSESS,
        payload: { ...data },
      });
    })
    .catch(err =>
      dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
    );
};

export const togglePlayer = () => dispatch => {
  dispatch({ type: actioTypes.TOGGLE_PLAYER });
};
