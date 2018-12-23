import * as api from '../api';
import ActionTypes from './actionTypes';
import { createNotification } from './notification';
import NotificationTypes from './notificationTypes';

export const fetchTrackList = () => async (dispatch, getState) => {
  dispatch({ type: ActionTypes.FETCH_TRACK_LIST });

  try {
    const tracks = await api.fetchTrackList(getState().user.userName);
    dispatch({
      type: ActionTypes.FETCH_TRACK_LIST_DONE,
      payload: { tracks },
    });
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_TRACK_LIST_FAILED });
    createNotification(
      "Can't fetch playlist",
      NotificationTypes.ERROR,
      dispatch
    );
  }
};

export const deleteObject = objectName => async (dispatch, getState) => {
  try {
    const tracks = await api.deleteObject(getState().user.userName, objectName);
    dispatch({
      type: ActionTypes.FETCH_TRACK_LIST_DONE,
      payload: { tracks },
    });
  } catch (error) {
    dispatch({ type: ActionTypes.FETCH_TRACK_LIST_FAILED });
    createNotification("Can't delete track", Notification.ERROR, dispatch);
  }
};
