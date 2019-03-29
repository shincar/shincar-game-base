import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

const style = createMuiTheme({
  button: {
    fontFamily: ["Noto Sans TC", "sans-serif"].join(','),
  },
  typography: {
    fontFamily: ["Noto Sans TC", "sans-serif"].join(','),
  }
});

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
    <MuiThemeProvider theme={style}>
      <App />
    </MuiThemeProvider>
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();
