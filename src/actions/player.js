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

export const pause = () => (dispatch, getState, soundCloudAudio) => {
  soundCloudAudio.pause();
  dispatch({ type: actioTypes.TOGGLE_PLAYER });
};

export const play = trackName => (dispatch, getState, soundCloudAudio) => {
  if (trackName === getState().player.currentTrack.name) {
    soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
  } else {
    dispatch({ type: actioTypes.REQUEST_NEXT_TRACK });
    soundCloudAudio.pause();
    api
      .getPresignUrl(trackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .then(() => {
        soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
        dispatch({ type: actioTypes.TOGGLE_PLAYER });
      })
      .catch(err => {
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err });
      });
  }
};

export const onAudioEnded = () => (dispatch, getState, soundCloudAudio) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== getState().trackList.tracks.length - 1) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex + 1]
      .name;

    dispatch({ type: actioTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    api
      .getPresignUrl(nextTrackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .then(() => {
        soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
        dispatch({ type: actioTypes.TOGGLE_PLAYER });
      })
      .catch(err =>
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
      );
  } else {
    dispatch({ type: actioTypes.TOGGLE_PLAYER });
  }
};

export const togglePlayer = () => dispatch => {
  dispatch({ type: actioTypes.TOGGLE_PLAYER });
};

export const nextTrack = () => (dispatch, getState, soundCloudAudio) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== getState().trackList.tracks.length - 1) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex + 1]
      .name;

    dispatch({ type: actioTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    api
      .getPresignUrl(nextTrackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .then(() => {
        soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
        dispatch({ type: actioTypes.TOGGLE_PLAYER });
      })
      .catch(err =>
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
      );
  }
};

export const previousTrack = () => (dispatch, getState, soundCloudAudio) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== 0) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex - 1]
      .name;

    dispatch({ type: actioTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    api
      .getPresignUrl(nextTrackName)
      .then(data => {
        dispatch({
          type: actioTypes.PLAY_REQUEST_SUCCSESS,
          payload: { ...data },
        });
      })
      .then(() => {
        soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
        dispatch({ type: actioTypes.TOGGLE_PLAYER });
      })
      .catch(err =>
        dispatch({ type: actioTypes.PLAY_REQUEST_FAILED, payload: err })
      );
  }
};
