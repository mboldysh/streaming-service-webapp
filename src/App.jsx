import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import theme from './muitheme';
import AppRoutes from './routes';
import store from './store/index';

export default () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <AppRoutes />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Provider>
);
