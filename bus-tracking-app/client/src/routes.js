// routes.js
import LoginPage from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import LandingPage from './components/LandingPage';
import ForgotPassword from './components/Auth/ForgotPassword';
import Log from './Log';
import EmailVerification from './components/Auth/EmailVerification'; 

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/landing', component: LandingPage },
  { path: '/signup', component: SignUp },
  { path: '/Log', component: Log },
  { path: '/forgot_password', component: ForgotPassword},
  { path: '/verify_email', component: EmailVerification }, 
  { }
];

export default routes;
