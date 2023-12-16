// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} component={route.component} />
        ))}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
