// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import LandingPage from './components/LandingPage';
import Log from './Log'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/Log" component={Log} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
