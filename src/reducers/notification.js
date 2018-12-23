const initialState = {
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ENQUEUE_SNACKBAR':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload.notification,
          },
        ],
      };

    case 'REMOVE_SNACKBAR':
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
