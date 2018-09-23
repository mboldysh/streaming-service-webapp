import * as api from '../api';
import actionTypes from './actionTypes';

export const fetchTrackList = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_TRACK_LIST });
  api
    .fetchTrackList()
    .then(tracks => {
      dispatch({
        type: actionTypes.FETCH_TRACK_LIST_DONE,
        payload: { tracks },
      });
    })
    .catch(() => dispatch({ type: actionTypes.FETCH_TRACK_LIST_FAILED }));
};
