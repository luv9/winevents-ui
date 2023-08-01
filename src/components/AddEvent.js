import React, { useState, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = ({ handleAddEvent, handleUpdateEvent, eventToUpdate, onClose }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    image: '',
    url: '',
    description: '',
    location: '',
    time: '',
    type: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (eventToUpdate) {
      setNewEvent(eventToUpdate);
    } else {
      setNewEvent({
        title: '',
        date: '',
        image: '',
        url: '',
        description: '',
        location: '',
        time: '',
        type: ''
      });
    }
  }, [eventToUpdate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newEvent.title.trim() === '' || newEvent.date.trim() === '' || !newEvent.image || newEvent.url.trim() === '' || newEvent.description.trim() === '' || newEvent.location.trim() === '' || newEvent.time.trim() === '' || newEvent.type.trim() === '') {
      setErrorMessage('Please enter all the event details.');
      return;
    }

    if (eventToUpdate) {
      handleUpdateEvent(newEvent);
    } else {
      handleAddEvent(newEvent);
    }

    setNewEvent({
      title: '',
      date: '',
      image: '',
      url: '',
      description: '',
      location: '',
      time: '',
      type: ''
    });
    setErrorMessage('');
    onClose();
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
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Event Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              placeholder="Enter event date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">Event URL:</label>
            <input
              type="url"
              id="url"
              name="url"
              value={newEvent.url}
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
              value={newEvent.description}
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
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Enter event location"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Event Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
              placeholder="Enter event time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Event Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              placeholder="Enter event type"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Event Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!eventToUpdate}
            />
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
