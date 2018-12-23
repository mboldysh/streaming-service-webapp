import ActionsType from '../actions/actionTypes';

const initialState = {
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload.notification,
          },
        ],
      };

    case ActionsType.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
};
