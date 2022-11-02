import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EventForm from './EventForm';

const PopupForm = ( { isOpen, togglePopup, isMapClicked } ) => {
  const closeModal = () => {
    togglePopup(false)
    isMapClicked(false)
  };

  return (
    <Popup open={isOpen} closeOnDocumentClick onClose={closeModal} modal position="right center">
      <div>
        <EventForm/>
      </div>
    </Popup>
  );
    
};

export default PopupForm;