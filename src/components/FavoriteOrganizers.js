import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import bannerImage from '../images/banner-image.jpg';

const FavoriteOrganizers = () => {
    const location = useLocation();
    const { favoriteOrganizers: initialFavoriteOrganizers } = location.state;
    const [favoriteOrganizers, setFavoriteOrganizers] = useState(initialFavoriteOrganizers || []);
    const [searchText, setSearchText] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let navigate = useNavigate();
  
    const handleInputChange = (event) => {
      setSearchText(event.target.value);
    };
  
    const handleSearch = () => {
      const filteredOrganizers = initialFavoriteOrganizers.filter((organizer) =>
        organizer.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFavoriteOrganizers(filteredOrganizers);
    };
  
    const handleMenuClick = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const handleAccountSettings = () => {
      navigate('/account-settings');
    }
  
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
          <div className="upper">
      <div className="header">
        <div className="logo">Win.Events</div>
        <div className="search-box">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search organizers"
          className="search-input"
        />
        <button className="btn search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </button>
        <div className="human-icon" onClick={handleMenuClick}>
          <FontAwesomeIcon icon={faUser} />
          {isMenuOpen && (
            <div className="menu">
              <button className="menu-item" onClick={handleGoToHomePage}>User Home Page</button>
              <button className="menu-item" onClick={handleAccountSettings}>Account Settings</button>
              <button className="menu-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      </div>
      <div className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
      </div>
      <h2>Favorite Organizers</h2>
      <div className="organizer-grid">
      {favoriteOrganizers.map((organizer) => (
        <div key={organizer.id} className="organizer_followed">
          <h3>{organizer.name}</h3>
          <img src={organizer.image} alt={organizer.name} />
        </div>
      ))}
      </div>

    </div>
  );
};

export default FavoriteOrganizers;
