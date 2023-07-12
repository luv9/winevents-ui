import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login.component';
import SignUp from './components/signup.component';
import AdminHomepage from './components/adminhomepage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginWrapper />} />
          <Route path="/sign-in" element={<LoginWrapper />} />
          <Route path="/sign-up" element={<SignUpWrapper />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
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

export default App;
