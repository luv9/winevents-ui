import React, { useState, useEffect } from 'react';
import './AddEvent.css';

const AddEvent = ({ handleAddEvent, handleUpdateEvent, eventToUpdate, onClose }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    image: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (eventToUpdate) {
      setNewEvent(eventToUpdate);
    } else {
      setNewEvent({
        title: '',
        date: '',
        image: ''
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

    if (newEvent.title.trim() === '' || newEvent.date.trim() === '' || !newEvent.image) {
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
      image: ''
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
