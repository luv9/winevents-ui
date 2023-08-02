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

  const handleAccountSettings = () => {
    navigate('/account-settings');
  }

  const handleFavoriteOrganizers = () => {
    navigate('/favorite-organizers', { state: { favoriteOrganizers: organizers.filter(organizer => organizer.followed) } });
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
    .then(data => {
      setFavoriteEvents(data);
      // Filter the events marked as favorite from allEvents and update the state
      const favoriteEventIds = data.map(event => event.id);
      const updatedAllEvents = allEvents.map(event => ({
        ...event,
        favorite: favoriteEventIds.includes(event.id)
      }));
      setAllEvents(updatedAllEvents);
    })
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
        title: 'Sight Seeing',
        date: 'August 15, 2023',
        image: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
        url: 'https://www.visitwindsoressex.com/event/family-sightseeing-and-sunset-cruises/'
        
      },
      {
        id: 2,
        title: 'Music Concert',
        date: 'September 5, 2023',
        image: 'https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M=',
        favorite: true,
        location: '300 Oulette',
        time: '3:15pm',
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 3,
        title: 'TedTalk',
        date: 'October 20, 2023',
        image: 'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
        url: 'https://www.eventbrite.com/',
      },
      {
        id: 4,
        title: 'Halloween Party',
        date: 'August 15, 2023',
        image: 'https://learnenglishteens.britishcouncil.org/sites/teens/files/field/image/rs9094_gettyimages-1254722164-hig.jpg',
        favorite: false,
        location: '300 Oulette',
        time: '3:15pm',
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
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
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
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
        description: "Join us for a captivating sightseeing tour! We'll discover breathtaking views, historical sites, and local hotspots.",
        url: 'https://www.eventbrite.com/',
      },
      // Add more static events as needed
    ];

   
    const staticOrganizers = [
      {
        id: 1,
        name: 'MAC SOCIETY',
        followed: false,
        image: 'https://img.freepik.com/free-vector/modern-desktop-compute-concept-illustration_114360-12156.jpg',
      },
      {
        id: 2,
        name: 'ECO SOCIETY',
        followed: false,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/001/995/586/small/hand-holding-a-tree-on-blurred-green-nature-background-planting-ideas-and-earth-day-free-photo.jpg',
      },
      {
        id: 3,
        name: 'MENG SOCIETY',
        followed: true,
        image: 'https://static1.squarespace.com/static/5d050cb57d55b300017168e3/t/5f51b716a5a0a53099009546/1690244595550/',
      },
      {
        id: 4,
        name: 'SOCCER CLUB',
        followed: false,
        image: 'data:image/png;base64,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',
      },
      {
        id: 5,
        name: 'DRAMA CLUB',
        followed: false,
        image: 'https://static1.squarespace.com/static/60bd67b9fd914d6f8695467f/t/60c8e0ea50803c408b7141dc/1658267924639/',
      },
      {
        id: 6,
        name: 'MUSIC CLUB',
        followed: false,
        image: 'https://cdn.xxl.thumbs.canstockphoto.com/dj-music-coloured-illustration-drawing_csp0530484.jpg',
      },
      {
        id: 7,
        name: 'SWIMMING CLUB',
        followed: false,
        image: 'https://static.vecteezy.com/system/resources/previews/007/955/138/original/swimming-logo-free-vector.jpg',
      },
      {
        id: 8,
        name: 'SALSA CLUB',
        followed: false,
        image: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-salsa-logo-badge_23-2149247706.jpg?w=2000',
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

  
  const handleToggleFavorite = (event, eventId) => {
    event.stopPropagation();
  
    // Find the event with the given eventId in the allEvents state.
    console.log(allEvents)
    const updatedEvents = allEvents.map((event) =>
      event.id === eventId
        ? { ...event, favorite: !event.favorite } // Toggle the 'favorite' property of the event
        : event // If this is not the event we're interested in, return it as-is
    );
  
    // Update the allEvents state with the updatedEvents array.
    setAllEvents(updatedEvents);
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
    event.favorite ? 'favorite' : ''
  }`}
  onClick={(e) => {
    e.stopPropagation();
    handleToggleFavorite(e, event.id);
  }}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(e, event.id);
                        }}
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
      <p>Description: {selectedEvent.description}</p>
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
