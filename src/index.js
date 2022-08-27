import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router } from 'react-router-dom';
// import ReduxToastr from 'react-redux-toastr'


const root = createRoot(document.querySelector('#root'));
root.render(
  <Provider store={store}>
      {/* <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      /> */}
      <Router>
        <App />
    </Router>
  </Provider>
);
