import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUser,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './UserHomePage.css';
import bannerImage from '../images/banner-image.jpg';
import { useNavigate } from 'react-router-dom';

const UserHomepage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 4;
  const [isBackArrowDisabled, setIsBackArrowDisabled] = useState(true);
  const [organizers, setOrganizers] = useState([]);
  const organizersPerPage = 7;
  const [organizersStartIndex, setOrganizersStartIndex] = useState(0);
  const [isOrganizersBackArrowDisabled, setIsOrganizersBackArrowDisabled] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  let navigate = useNavigate();

  const handleNextPage = () => {
    setStartIndex(prevStartIndex => (prevStartIndex + eventsPerPage) % allEvents.length);
    setIsBackArrowDisabled(false); // Enable the back arrow button after going to the next page
  };

  const handlePrevPage = () => {
    setStartIndex(prevStartIndex =>
      (prevStartIndex - eventsPerPage + allEvents.length) % allEvents.length
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleToggleFollow = (organizerId) => {
    // Update the 'followed' state of the organizer with the given ID
    setOrganizers(prevOrganizers =>
      prevOrganizers.map((organizer) =>
        organizer.id === organizerId
          ? { ...organizer, followed: !organizer.followed }
          : organizer
      )
    );
  }

  const handleOrganizersNextPage = () => {
    setOrganizersStartIndex(prevStartIndex => (prevStartIndex + organizersPerPage) % organizers.length);
    setIsOrganizersBackArrowDisabled(false); // Enable the back arrow button after going to the next page
  };

  const handleOrganizersPrevPage = () => {
    setOrganizersStartIndex(prevStartIndex =>
      (prevStartIndex - organizersPerPage + organizers.length) % organizers.length
    );
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // add your logout logic here
    navigate('/user-signin');
  };

  const handleFavoriteOrganizers = () => {
    console.log('Showing favorite organizers...');
    // add your favorite organizers logic here
  };

  useEffect(() => {
    setIsOrganizersBackArrowDisabled(organizersStartIndex === 0); // Enable/disable back arrow button based on startIndex
  }, [organizersStartIndex]);
  
  useEffect(() => {
    setIsBackArrowDisabled(startIndex === 0); // Enable/disable back arrow button based on startIndex
  }, [startIndex]);
  
  useEffect(() => {
    // Fetch favorite events
    fetch('https://api.example.com/favorite-events')
      .then(response => response.json())
      .then(data => setFavoriteEvents(data))
      .catch(error => console.log(error));

    // Fetch events from favorite organizers
    fetch('https://api.example.com/favorite-organizers-events')
    .then(response => response.json())
    .then(data => setOrganizers(data))
    .catch(error => console.log(error));

    // Add static events
    const staticEvents = [
      {
        id: 1,
        title: 'Event 1',
        date: 'August 15, 2023',
        image: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://motorolasolutions.wd5.myworkdayjobs.com/en-US/Careers/login?redirect=%2Fen-US%2FCareers%2FuserHome'
        
      },
      {
        id: 2,
        title: 'Event 2',
        date: 'September 5, 2023',
        image: 'https://example.com/event2-image.jpg',
        favorite: true,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 3,
        title: 'Event 3',
        date: 'October 20, 2023',
        image: 'https://example.com/event3-image.jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 4,
        title: 'Event 4s',
        date: 'August 15, 2023',
        image: 'https://example.com/event1-image.jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 5,
        title: 'Event 5',
        date: 'September 5, 2023',
        image: 'https://example.com/event2-image.jpg',
        favorite: true,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 6,
        title: 'Event 6',
        date: 'October 20, 2023',
        image: 'https://example.com/event3-image.jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        url: 'https://www.eventbrite.com/',
      },
      // Add more static events as needed
    ];

   
    const staticOrganizers = [
      {
        id: 1,
        name: 'Organizer 1',
        followed: false,
        image: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
      },
      {
        id: 2,
        name: 'Organizer 2',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 3,
        name: 'Organizer 3',
        followed: true,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 4,
        name: 'Organizer 4',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 5,
        name: 'Organizer 4',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 6,
        name: 'Organizer 4',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 7,
        name: 'Organizer 4',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      {
        id: 8,
        name: 'Organizer 4',
        followed: false,
        image: 'https://example.com/organizer1-image.jpg',
      },
      
      // Add more static organizers as needed
    ];
    setAllEvents(staticEvents);
    setOrganizers(staticOrganizers);
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
        <div className="logo">Win.Events</div>
        <div className="search-box">
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search events"
            className="search-input"
          />
          <button className="btn search-button" onClick={handleSearch} disabled={isBackArrowDisabled}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
          <div className="human-icon" onClick={handleMenuClick}>
            <FontAwesomeIcon icon={faUser} />
            {isMenuOpen && (
              <div className="menu">
                <button className="menu-item" onClick={handleFavoriteOrganizers}>Favorite Organizers</button>
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
      <h2>All Events</h2>
    <div className="all-events">
      {allEvents.length > eventsPerPage && (
        <div className="event-navigation">
          <div className="event-cards-container">
          <button className='button_style' onClick={handlePrevPage} disabled={isBackArrowDisabled}>
          <FontAwesomeIcon icon={faChevronLeft} />
          </button>
            {allEvents
              .slice(startIndex, startIndex + eventsPerPage)
              .map((event) => (
                <div key={event.id} className="event-card" onClick={() => handleEventClick(event)}>
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
          <button className='button_style' onClick={handleNextPage} disabled={startIndex + eventsPerPage >= allEvents.length}>
          <FontAwesomeIcon icon={faChevronRight} />
          </button>
          </div>
        </div>
      )}
    </div>
    <h2>Saved Events</h2>
    <div className="favorite-events">
    {favoriteEvents.length > 0 ? (
      <div className="event-navigation">
        <div className="event-cards-container">
        <button className = "button_style" onClick={handlePrevPage} disabled={isBackArrowDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
          {favoriteEvents
            .slice(startIndex, startIndex + eventsPerPage)
            .map((event) => (
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
            <button className='button_style' onClick={handleNextPage} disabled={startIndex + eventsPerPage >= favoriteEvents.length}>
            <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
      </div>
      ) : (
        <p className="no-events-message">No saved events!!</p>
      )}
    </div>
    <h2>Organizers to Follow</h2>
<div className="organizers-to-follow">
  {organizers.length > 0 && (
    <div className="organizer-navigation">
      <div className="organizer-cards-container">
        {organizers.length > organizersPerPage && (
          <button className='button_style' onClick={handleOrganizersPrevPage} disabled={isOrganizersBackArrowDisabled}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {organizers
          .slice(organizersStartIndex, organizersStartIndex + Math.min(organizersPerPage, organizers.length))
          .map((organizer) => (
            <div key={organizer.id} className="organizer-card">
              <img src={organizer.image} alt={organizer.name} className="organizer-image" />
              <h3>{organizer.name}</h3>
              <button
                className={`follow-button ${organizer.followed ? 'followed' : ''}`}
                onClick={() => handleToggleFollow(organizer.id)}
              >
                {organizer.followed ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        {organizers.length > organizersPerPage && (
          <button className='button_style' onClick={handleOrganizersNextPage} disabled={organizersStartIndex + organizersPerPage >= organizers.length}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  )}
</div>


    {/* Pop-up on click */}
    {selectedEvent && (
  <>
    <div className="popup-overlay" onClick={() => setSelectedEvent(null)} />
    <div className="event-popup">
      <h3>{selectedEvent.title}</h3>
      <img src={selectedEvent.image} alt={selectedEvent.title} />
      <p>Date: {selectedEvent.date}</p>
      <p>Location: {selectedEvent.location}</p>
      <p>Time: {selectedEvent.time}</p>
      <p>Link:</p>
      <p><a href={selectedEvent.url}>{selectedEvent.url}</a></p>
      <button onClick={() => setSelectedEvent(null)}>Close</button>
    </div>
  </>
)}
    </div>
  );
};

export default UserHomepage
