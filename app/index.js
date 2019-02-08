import React from 'react';
import ReactDOM from 'react-dom';
//Webpack hot loader plugin.
import { AppContainer } from 'react-hot-loader';
//Main entry point of the application
import Root from './components/Root';

//REDUX
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import itemsReducer from './reducers/items.reducer';

const rootReducer = combineReducers({
  itemsReducer
});

const store = createStore(rootReducer);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

//The root component is in a separate file,
//becuase we are using the Webpack hot loading feature
render(Root);

//If webpack hot loader is enabled, it will listen  root.js file for modifications;
//if something has been change in the file, it will re render the module.
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const newApp = require('./components/Root').default;
    render(newApp);
  });
}
