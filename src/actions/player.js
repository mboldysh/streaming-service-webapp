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

export const nextTrack = () => (dispatch, getState) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack);
  if (currentTrackIndex !== getState().trackList.tracks.length - 1) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex + 1]
      .name;

    dispatch({ type: actioTypes.PLAY_REQUEST, payload: nextTrackName });

    api
      .getPresignUrl(nextTrackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .catch(err =>
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
      );
  }
};

export const previousTrack = () => (dispatch, getState) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack);
  if (currentTrackIndex !== 0) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex - 1]
      .name;

    dispatch({ type: actioTypes.PLAY_REQUEST, payload: nextTrackName });

    api
      .getPresignUrl(nextTrackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .catch(err =>
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
      );
  }
};
