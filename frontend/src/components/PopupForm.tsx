import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EventForm from './EventForm';

const PopupForm = ( { isOpen, togglePopup, isEventFormActive, longitudeVal, latitudeVal, setEventList } ) => {
  const closeModal = () => {
    togglePopup(false)
    isEventFormActive(false)
  };

  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} modal position="right center">
      <div>
        <EventForm 
          longitude = { longitudeVal } 
          latitude = { latitudeVal }
          setEventMarkerList = { setEventList }
          setEventCreate = { togglePopup }
          setActivateEventForm = { isEventFormActive }
        />
      </div>
    </Popup>
  );
    
};

export default PopupForm;