import * as api from '../api';
import actioTypes from './actionTypes';
import fileSaver from '../fileSaver';

export const onPlay = trackName => (dispatch, getState) => {
  dispatch({ type: actioTypes.PLAY_REQUEST, payload: trackName });

  api
    .getPresignUrl(getState().user.userName, trackName)
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
    dispatch({ type: actioTypes.TOGGLE_PLAYER });
  } else {
    dispatch({ type: actioTypes.REQUEST_NEXT_TRACK });
    soundCloudAudio.pause();
    api
      .getPresignUrl(getState().user.userName, trackName)
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
      .getPresignUrl(getState().user.userName, nextTrackName)
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
      .getPresignUrl(getState().user.userName, nextTrackName)
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
      .getPresignUrl(getState().user.userName, nextTrackName)
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

export const uploadTracks = tracks => async (dispatch, getState) => {
  dispatch({ type: actioTypes.UPLOUD_START });

  try {
    await api.uploadFiles(getState().user.userName, tracks);
    dispatch({ type: actioTypes.FETCH_TRACK_LIST });

    const trackList = await api.fetchTrackList(getState().user.userName);

    dispatch({
      type: actioTypes.FETCH_TRACK_LIST_DONE,
      payload: { tracks: trackList },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: actioTypes.FETCH_TRACK_LIST_FAILED });
  }

  dispatch({ type: actioTypes.UPLOAD_FINISHED });
};

// dispatch({ type: actionTypes.FETCH_TRACK_LIST });
//   api
//     .fetchTrackList()
//     .then(tracks => {
//       dispatch({
//         type: actionTypes.FETCH_TRACK_LIST_DONE,
//         payload: { tracks },
//       });
//     })
//     .catch(() => dispatch({ type: actionTypes.FETCH_TRACK_LIST_FAILED }));

export const downloadTrack = trackName => async (dispatch, getState) => {
  dispatch({ type: actioTypes.DOWNLOAD_START });

  try {
    const { url } = await api.getPresignUrl(
      getState().user.userName,
      trackName
    );

    const { data } = await api.downloadFile(url);

    await fileSaver(data, trackName);
  } catch (error) {
    console.log(error);
  }

  dispatch({ type: actioTypes.DOWNLOAD_FINISHED });
};
