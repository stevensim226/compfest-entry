import React from 'react';

import Navigation from './components/Navigation'
import Body from './components/Body'
import Saved from './components/Saved'
import Error404 from './components/Error404'

import {BrowserRouter, Route, Switch} from "react-router-dom"

function App() {
  return (
    <div className="App">
    <div className="hover-blur"></div>
    <div className="alert alert-danger position-fixed save-error text-center">
      <p className="m-0">Error while saving meme</p>
      <p className="m-0">Please make sure the Django server or your internet is running</p>
    </div>
      <BrowserRouter>
        <Navigation className="navbar" />
          <Switch>
            <Route exact path="/compfest-entry" component={Body} />
            <Route exact path="/saved" component={Saved} />
            <Route component={Error404} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
