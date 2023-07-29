import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './UserHomePage.css';
import bannerImage from '../images/banner-image.jpg';

const UserHomepage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [favoriteOrganizersEvents, setFavoriteOrganizersEvents] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Fetch favorite events
    fetch('https://api.example.com/favorite-events')
      .then(response => response.json())
      .then(data => setFavoriteEvents(data))
      .catch(error => console.log(error));

    // Fetch events from favorite organizers
    fetch('https://api.example.com/favorite-organizers-events')
      .then(response => response.json())
      .then(data => setFavoriteOrganizersEvents(data))
      .catch(error => console.log(error));

    // Add static events
    const staticEvents = [
      {
        id: 1,
        title: 'Event 1',
        date: 'August 15, 2023',
        image: 'https://example.com/event1-image.jpg',
        favorite: false,
      },
      {
        id: 2,
        title: 'Event 2',
        date: 'September 5, 2023',
        image: 'https://example.com/event2-image.jpg',
        favorite: true,
      },
      {
        id: 3,
        title: 'Event 3',
        date: 'October 20, 2023',
        image: 'https://example.com/event3-image.jpg',
        favorite: false,
      },
      // Add more static events as needed
    ];

    setAllEvents(staticEvents);
  }, []);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const filteredEvents = allEvents.filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setAllEvents(filteredEvents);
  };

  const handleToggleFavorite = (eventId) => {
    const eventToUpdate = allEvents.find((event) => event.id === eventId);
    if (eventToUpdate) {
      if (eventToUpdate.favorite) {
        setFavoriteEvents((prevFavoriteEvents) =>
          prevFavoriteEvents.filter((event) => event.id !== eventId)
        );
      } else {
        setFavoriteEvents((prevFavoriteEvents) => [
          ...prevFavoriteEvents,
          eventToUpdate,
        ]);
      }
      setAllEvents((prevAllEvents) =>
        prevAllEvents.map((event) =>
          event.id === eventId
            ? { ...event, favorite: !event.favorite }
            : event
        )
      );
    }
  };

  return (
    <div className="user-homepage">
      <div className="upper">
      <div className="header">
        <div className="logo">WinEvents</div>
        <div className="search-box">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search events"
            className="search-input"
          />
          <button className="btn search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
          <div className="human-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
      <div className="banner">
        <img src={bannerImage} alt="Banner" className="banner-image" />
      </div>
      </div>
      <h2>All Events</h2>
      <div className="all-events">
        {/* Render the list of all non-hidden events */}
        {allEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <button
                className={`favorite-button ${
                  favoriteEvents.some((favEvent) => favEvent.id === event.id)
                    ? 'favorite'
                    : ''
                }`}
                onClick={() => handleToggleFavorite(event.id)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <h2>Saved Events</h2>
      <div className="favorite-events">
        {/* Render the list of favorite events */}
        {favoriteEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <button
                className={`favorite-button favorite`}
                onClick={() => handleToggleFavorite(event.id)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="favorite-organizers-events">
        <h2>Events from Your Favorite Organizers</h2>
        {/* Render the list of events from favorite organizers */}
        {favoriteOrganizersEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            {/* Add event details */}
            <button
              className={`favorite-button ${
                event.favorite ? 'favorite' : ''
              }`}
              onClick={() => handleToggleFavorite(event.id)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHomepage;
