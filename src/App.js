import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import AdminHomepage from './components/adminhomepage';
import UserLogin from './components/UserLogin';
import UserSignUp from './components/UserSignUp';
import UserHomepage from './components/UserHomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginWrapper />} />
          <Route path="/sign-in" element={<LoginWrapper />} />
          <Route path="/sign-up" element={<SignUpWrapper />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/user-signin" element={<UserLoginWrapper />} />
          <Route path="/user-signup" element={<UserSignUpWrapper />} />
          <Route path="/user-homepage" element={<UserHomepage />} />
          <Route path="/user-signin" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component for Login
function LoginWrapper() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <Login />
      </div>
    </div>
  );
}

// Wrapper component for SignUp
function SignUpWrapper() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <SignUp />
      </div>
    </div>
  );
}

// Wrapper component for UserLogin
function UserLoginWrapper() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <UserLogin />
      </div>
    </div>
  );
}

// Wrapper component for UserSignUp
function UserSignUpWrapper() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <UserSignUp />
      </div>
    </div>
  );
}

export default App;
