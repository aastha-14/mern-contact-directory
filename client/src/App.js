import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Routes from "./components/routing/Route";
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/layouts/Navbar';
import { loadUser } from "./actions/auth";

//Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
