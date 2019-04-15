import React, { Component } from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './configureStore';
const { persistor, store } = configureStore();
import GamePage from './containers/GamePage/';
import './App.css';

interface AppProps {
}

class App extends Component<AppProps> {

  render() {
    const routes = (
      <Switch>
        <Route path="/" exact component={GamePage} />
        <Route path="/:id" exact component={GamePage} />
        <Redirect from="/" to="/" />
      </Switch>
    );

    return (
      <div className="App">
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <HashRouter basename="/" hashType="noslash">
          {routes}
        </HashRouter>
        </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
