// LandingPage.js
import React from 'react';
import { useHistory } from 'react-router-dom';

function LandingPage() {
  const history = useHistory();

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={redirectToLogin}>Go to Login</button>
    </div>
  );
}

export default LandingPage;
