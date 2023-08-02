import React, { useState, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = ({ eventToUpdate, onClose, onSubmit }) => {
  const [newEvent, setNewEvent] = useState({
    Title: '',
    Time: '',
    Photo: '',
    Url: '',
    Description: '',
    Location: '',
    Type: '',
    Organiser: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (eventToUpdate) {
      setNewEvent(eventToUpdate);
    } else {
      const id = localStorage.getItem('id'); // retrieve id from local storage
      setNewEvent({
        Title: '',
        Time: '',
        Photo: '',
        Url: '',
        Description: '',
        Location: '',
        Type: '',
        Organiser: id
      });
    }
  }, [eventToUpdate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name.charAt(0).toUpperCase() + name.slice(1)]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        Photo: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newEvent.Title.trim() === '' || newEvent.Time.trim() === '' || !newEvent.Photo || newEvent.Url.trim() === '' || newEvent.Description.trim() === '' || newEvent.Location.trim() === '' || newEvent.Type.trim() === '') {
      setErrorMessage('Please enter all the event details.');
      return;
    }

    onSubmit(newEvent);
  };

  return (
    <div className="add-event-overlay">
      <div className="add-event-form">
        <h2>{eventToUpdate ? 'Update Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.Title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Event DateTime:</label>
            <input
              type="datetime-local"
              id="time"
              name="time"
              value={newEvent.Time}
              onChange={handleInputChange}
              placeholder="Enter event date and time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Event URL:</label>
            <input
              type="url"
              id="url"
              name="url"
              value={newEvent.Url}
              onChange={handleInputChange}
              placeholder="Enter event URL"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              name="description"
              value={newEvent.Description}
              onChange={handleInputChange}
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Event Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newEvent.Location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Event Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newEvent.Type}
              onChange={handleInputChange}
              placeholder="Enter event type"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Event Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              required={!eventToUpdate || !newEvent.Photo}
            />
            {newEvent.Photo && (
              <img src={newEvent.Photo} alt="Preview" className="image-preview" />
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-container">
            <button type="submit" className="btn btn-primary">
              {eventToUpdate ? 'Update Event' : 'Add Event'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
