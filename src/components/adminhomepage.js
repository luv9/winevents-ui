import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faBars, faUser, faChevronLeft, faChevronRight, faEye, faPlus, faEyeSlash, faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddEvent from './AddEvent';
import './Admin.css';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:9000/organiser/event', {
        headers: {
          'Authorization': ` ${token}`
        }
      });
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    const filteredEvents = events.filter((event) => event.Title.toLowerCase().includes(searchText.toLowerCase()));
    setEvents(filteredEvents);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      await axios.post('http://localhost:9000/organiser/event', newEvent, {
        headers: {
          'Authorization': ` ${token}`
        }
      });
      fetchEvents();
      closeAddEventForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateEvent = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:9000/organiser/event/${updatedEvent.id}`, updatedEvent, {
        headers: {
          'Authorization': ` ${token}`
        }
      });
      fetchEvents();
      closeAddEventForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9000/organiser/event/${eventId}`, {
        headers: {
          'Authorization': ` ${token}`
        }
      });
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
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

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="admin-page">
      {/* Header section */}
      <div className="header">
        <div className="logo">Win.Events</div>
        <div className="search-box">
          <input type="text" value={searchText} onChange={handleInputChange} placeholder="Search events" className="search-input" />
          <button className="btn search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
          <div className="human-icon">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </div>
      <h2 className="event-heading">Your events</h2>
      <div className="event-list">
        <div className="row">
          {currentEvents.map((event) => (
            <div key={event.id} className="col-md-4">
              <div className="card mb-4">
                <img src={event.Photo} className="card-img-top" alt="Event" />
                <div className="card-body">
                  <h5 className="card-title">{event.Title}</h5>
                  <p className="card-text">Time: {event.Time}</p> {/* Displaying Time */}
                  <p className="card-text">URL: {event.Url}</p> {/* Displaying URL */}
                  <div className="d-flex justify-content-center align-items-center mt-4">
                    {/* Event buttons */}
                    <button className="btn btn-light rounded-circle update-button" onClick={() => openUpdateEventForm(event.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-light rounded-circle delete-button" onClick={() => handleDeleteEvent(event.id)}>
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
        <AddEvent onSubmit={eventToUpdate ? handleUpdateEvent : handleAddEvent} eventToUpdate={eventToUpdate} onClose={closeAddEventForm} />
      )}
      {/* Pagination */}
      <div className="pagination">
        <button className="pagination-button btn btn-link" onClick={prevPage} disabled={currentPage === 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} className={`pagination-button btn btn-link ${currentPage === index + 1 ? 'active' : ''}`} onClick={() => goToPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button className="pagination-button btn btn-link" onClick={nextPage} disabled={currentPage === totalPages}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
