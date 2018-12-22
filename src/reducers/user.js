import ActionTypes from '../actions/actionTypes';

const initialState = {
  userName: '',
  isAuthorized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        ...state,
        userName: action.payload.userName,
        isAuthorized: true,
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        userName: '',
        isAuthorized: false,
      };
    default:
      return state;
  }
};
