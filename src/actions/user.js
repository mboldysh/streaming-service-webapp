import ActionTypes from './actionTypes';

export const logIn = userName => dispatch => {
  console.log(userName)
  dispatch({
    type: ActionTypes.LOG_IN,
    payload: { userName },
  });
};

export const logOut = () => dispatch => {
  dispatch({
    type: ActionTypes.LOG_OUT,
  });
};
