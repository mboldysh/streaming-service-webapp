import * as api from '../api';
import actionTypes from './actionTypes';

export const fetchTrackList = () => (dispatch, getState) => {
  dispatch({ type: actionTypes.FETCH_TRACK_LIST });
  api
    .fetchTrackList(getState().user.userName)
    .then(tracks => {
      dispatch({
        type: actionTypes.FETCH_TRACK_LIST_DONE,
        payload: { tracks },
      });
    })
    .then(() => {
      const notification = {
        key: new Date().getTime() + Math.random(),
        message: 'Failed fetching data.',
        options: {
          variant: 'warning',
        },
      };
      dispatch({ type: 'ENQUEUE_SNACKBAR', payload: { notification } });
    })
    .catch(() => dispatch({ type: actionTypes.FETCH_TRACK_LIST_FAILED }));
};

export const deleteObject = objectName => (dispatch, getState) => {
  api
    .deleteObject(getState().user.userName, objectName)
    .then(tracks => {
      dispatch({
        type: actionTypes.FETCH_TRACK_LIST_DONE,
        payload: { tracks },
      });
    })
    .catch(() => dispatch({ type: actionTypes.FETCH_TRACK_LIST_FAILED }));
};
