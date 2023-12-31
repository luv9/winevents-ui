import React, { Component } from 'react';
import Navbar from './navbar';

export default class UserSignUp extends Component {
  handleLogoChange = (e) => {
    const file = e.target.files[0];
    // Perform any additional logic with the selected file
    console.log(file);
  };

  render() {
    return (
      <>
        <Navbar />
        <form>
          <h3>User Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3">
            <label>Phone number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Phone number"
            />
          </div>
          <div className="mb-3">
            <label>Profile photo</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={this.handleLogoChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered? <a href="/user-login">Sign In</a>
          </p>
        </form>
      </>
    );
  }
}
