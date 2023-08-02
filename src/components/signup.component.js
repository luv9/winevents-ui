import React, { useState } from 'react';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    Name: '',
    Email: '',
    Password: '',
    Logo: null,
    Description: '',
    SocialMediaURL: ''
  });

  const handleInputChange = (event) => {
    setState(prevState => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace('data:', '')
        .replace(/^.+,/, '');
      setState(prevState => ({ ...prevState, logo: base64String }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonBody = JSON.stringify(state);
    console.log('Sending request with JSON body:', jsonBody);
  
    try {
      const response = await fetch('http://localhost:9000/organiser/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonBody
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Sign up successful');
      navigate('/sign-in');
    } catch (error) {
      console.error(`Sign up failed: ${error}`);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Logo</label>
          <input
            type="file"
            name="logo"
            className="form-control"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Social Media URL</label>
          <input
            type="text"
            name="socialMediaURL"
            className="form-control"
            placeholder="Social Media URL"
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </>
  );
}

export default SignUp;