import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../images/account_settings.png';
import './AccountSettings.css'; 

const AccountSettings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePhoto] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log({
      firstName,
      lastName,
      profilePhoto,
      password,
      phoneNum,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    // Perform any additional logic with the selected file
    console.log(file);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // add your logout logic here
    navigate('/user-signin');
  };

  const handleGoToHomePage = () => {
    navigate('/user-homepage');
  };

  return (
    <div>
      <div className="header">
        <div className="logo">Win.Events</div>
        <div className="human-icon" onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faUser} />
          {isMenuOpen && (
            <div className="menu">
              <button className="menu-item" onClick={handleGoToHomePage}>User Home Page</button>
              <button className="menu-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Profile Photo:
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </label>
          <button type="submit">Save Settings</button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;
