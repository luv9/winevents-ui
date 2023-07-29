import React, { useState, useEffect } from 'react';
import './Admin.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faUser, faChevronLeft, faChevronRight, faEye, faPlus, faEyeSlash, faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import AddEvent from './AddEvent';
import bannerImage from '../images/banner-image.jpg';

library.add(faBars, faChevronLeft, faChevronRight, faEye, faPlus, faEyeSlash, faEdit, faTrashAlt, faSearch);

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  const handleAddEvent = (newEvent) => {
    if (newEvent.title.trim() === '' || newEvent.date.trim() === '' || !newEvent.image) {
      alert('Please enter all the event details.');
      return;
    }

    const newEventWithId = { ...newEvent, id: uuidv4() };
    setEvents([...events, newEventWithId]);
    setShowAddEventForm(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === eventToUpdate.id ? { ...event, ...updatedEvent } : event
    );
    setEvents(updatedEvents);
    setShowAddEventForm(false);
    setEventToUpdate(null);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const handleToggleVisibility = (eventId) => {
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, visible: !event.visible } : event
    );
    setEvents(updatedEvents);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const getDefaultImage = () => {
    return 'https://example.com/default-image.jpg';
  };

  const openAddEventForm = () => {
    setShowAddEventForm(true);
    setEventToUpdate(null);
  };

  const openUpdateEventForm = (eventId) => {
    const eventToUpdate = events.find((event) => event.id === eventId);
    setShowAddEventForm(true);
    setEventToUpdate(eventToUpdate);
  };

  const closeAddEventForm = () => {
    setShowAddEventForm(false);
    setEventToUpdate(null);
  };

  return (
    <div className="admin-page">
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
      <h2 className="event-heading">Your events</h2>
      <div className="event-list">
        <div className="row">
          {currentEvents.map((event) => (
            <div key={event.id} className="col-md-4">
              <div className="card mb-4">
                <img src={event.image || getDefaultImage()} className="card-img-top" alt="Event" />
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">Date: {event.date}</p>
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <button
                      className={`btn btn-light rounded-circle toggle-visibility-button ${
                        event.visible ? 'visible' : 'hidden'
                      }`}
                      onClick={() => handleToggleVisibility(event.id)}
                    >
                      {event.visible ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </button>
                    <button
                      className="btn btn-light rounded-circle update-button"
                      onClick={() => openUpdateEventForm(event.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="btn btn-light rounded-circle delete-button"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="add-event-button" onClick={openAddEventForm}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {showAddEventForm && (
        <div className="add-event-overlay">
          <div className="add-event-form">
            <h2>{eventToUpdate ? 'Update Event' : 'Add Event'}</h2>
            <AddEvent
              handleAddEvent={handleAddEvent}
              handleUpdateEvent={handleUpdateEvent}
              eventToUpdate={eventToUpdate}
              onClose={closeAddEventForm}
            />
          </div>
        </div>
      )}
      <div className="pagination">
        <button
          className="pagination-button btn btn-link"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button btn btn-link ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="pagination-button btn btn-link"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
