import ActionTypes from './actionTypes';

export const createNotification = (message, variant, dispatch) => {
  const notification = {
    key: new Date().getTime() + Math.random(),
    message,
    options: {
      variant,
    },
  };
  dispatch({
    type: ActionTypes.ENQUEUE_SNACKBAR,
    payload: { notification },
  });
};

export const enqueueSnackbar = notification => ({
  type: ActionTypes.ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeSnackbar = key => ({
  type: ActionTypes.REMOVE_SNACKBAR,
  key,
});
