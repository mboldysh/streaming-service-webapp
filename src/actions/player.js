import * as api from '../api';
import ActionTypes from './actionTypes';
import fileSaver from '../fileSaver';
import { createNotification } from './notification';
import NotificationTypes from './notificationTypes';

export const onPlay = trackName => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.PLAY_REQUEST, payload: trackName });

  try {
    const data = await api.getPresignUrl(getState().user.userName, trackName);
    dispatch({ type: ActionTypes.PLAY_REQUEST_SUCCSESS, payload: { ...data } });
  } catch (error) {
    dispatch({ type: ActionTypes.PLAY_REQUEST_FAILED });
    createNotification("Can't play track", NotificationTypes.ERROR, dispatch);
  }
};

export const pause = () => (dispatch, getState, soundCloudAudio) => {
  soundCloudAudio.pause();
  dispatch({ type: ActionTypes.TOGGLE_PLAYER });
};

export const play = trackName => async (
  dispatch,
  getState,
  soundCloudAudio
) => {
  if (trackName === getState().player.currentTrack.name) {
    soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
    dispatch({ type: ActionTypes.TOGGLE_PLAYER });
  } else {
    dispatch({ type: ActionTypes.REQUEST_NEXT_TRACK });
    soundCloudAudio.pause();
    try {
      const data = await api.getPresignUrl(getState().user.userName, trackName);
      dispatch({
        type: ActionTypes.PLAY_REQUEST_SUCCSESS,
        payload: { ...data },
      });
      dispatch({ type: ActionTypes.TOGGLE_PLAYER });
      soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
    } catch (error) {
      dispatch({ type: ActionTypes.PLAY_REQUEST_FAILED });
      createNotification("Can't play track", NotificationTypes.ERROR, dispatch);
    }
  }
};

export const onAudioEnded = () => async (
  dispatch,
  getState,
  soundCloudAudio
) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== getState().trackList.tracks.length - 1) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex + 1]
      .name;

    dispatch({ type: ActionTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    try {
      const data = await api.getPresignUrl(
        getState().user.userName,
        nextTrackName
      );
      dispatch({
        type: ActionTypes.PLAY_REQUEST_SUCCSESS,
        payload: { ...data },
      });
      dispatch({ type: ActionTypes.TOGGLE_PLAYER });
      soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
    } catch (error) {
      dispatch({ type: ActionTypes.PLAY_REQUEST_FAILED });
      createNotification(
        "Can't play next track",
        NotificationTypes.ERROR,
        dispatch
      );
    }
  } else {
    dispatch({ type: ActionTypes.TOGGLE_PLAYER });
  }
};

export const togglePlayer = () => dispatch => {
  dispatch({ type: ActionTypes.TOGGLE_PLAYER });
};

export const nextTrack = () => async (dispatch, getState, soundCloudAudio) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== getState().trackList.tracks.length - 1) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex + 1]
      .name;

    dispatch({ type: ActionTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    try {
      const data = await api.getPresignUrl(
        getState().user.userName,
        nextTrackName
      );
      dispatch({
        type: ActionTypes.PLAY_REQUEST_SUCCSESS,
        payload: { ...data },
      });
      dispatch({ type: ActionTypes.TOGGLE_PLAYER });
      soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
    } catch (error) {
      dispatch({ type: ActionTypes.PLAY_REQUEST_FAILED });
      createNotification(
        "Can't play next track",
        NotificationTypes.ERROR,
        dispatch
      );
    }
  }
};

export const previousTrack = () => async (
  dispatch,
  getState,
  soundCloudAudio
) => {
  const currentTrackIndex = getState()
    .trackList.tracks.map(track => track.name)
    .indexOf(getState().player.currentTrack.name);
  if (currentTrackIndex !== 0) {
    const nextTrackName = getState().trackList.tracks[currentTrackIndex - 1]
      .name;

    dispatch({ type: ActionTypes.REQUEST_NEXT_TRACK, payload: nextTrackName });

    try {
      const data = await api.getPresignUrl(
        getState().user.userName,
        nextTrackName
      );
      dispatch({
        type: ActionTypes.PLAY_REQUEST_SUCCSESS,
        payload: { ...data },
      });
      dispatch({ type: ActionTypes.TOGGLE_PLAYER });
      soundCloudAudio.play({ streamUrl: getState().player.currentTrack.url });
    } catch (error) {
      dispatch({ type: ActionTypes.PLAY_REQUEST_FAILED });
      createNotification(
        "Can't play previous track",
        NotificationTypes.ERROR,
        dispatch
      );
    }
  }
};

export const uploadTracks = tracks => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.UPLOUD_START });

  try {
    await api.uploadFiles(getState().user.userName, tracks);
    dispatch({ type: ActionTypes.FETCH_TRACK_LIST });

    const trackList = await api.fetchTrackList(getState().user.userName);

    dispatch({
      type: ActionTypes.FETCH_TRACK_LIST_DONE,
      payload: { tracks: trackList },
    });
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_TRACK_LIST_FAILED });
    createNotification(
      "Can't upload tracks",
      NotificationTypes.ERROR,
      dispatch
    );
  }

  dispatch({ type: ActionTypes.UPLOAD_FINISHED });
};

export const downloadTrack = trackName => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.DOWNLOAD_START });

  try {
    const { url } = await api.getPresignUrl(
      getState().user.userName,
      trackName
    );

    const { data } = await api.downloadFile(url);

    await fileSaver(data, trackName);
  } catch (error) {
    createNotification(
      "Can't download track",
      NotificationTypes.ERROR,
      dispatch
    );
  }

  dispatch({ type: ActionTypes.DOWNLOAD_FINISHED });
};
