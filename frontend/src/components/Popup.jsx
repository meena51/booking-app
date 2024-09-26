// Popup.js
import React from 'react';
import './Popup.css'; // Add your styles here

const Popup = ({ roomDetails, setRoomDetails, onClose }) => {
  const handleRoomDetailsChange = (index, field, value) => {
    const updatedRoomDetails = [...roomDetails];
    updatedRoomDetails[index][field] = parseInt(value);
    setRoomDetails(updatedRoomDetails);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Room</h2>
        {roomDetails.map((room, index) => (
          <div key={index}>
            <h3>Room {index + 1}</h3>
            <div>
              <label>Adults:</label>
              <input
                type="number"
                value={room.adults}
                onChange={(e) => handleRoomDetailsChange(index, 'adults', e.target.value)}
                min="1"
                max="8"
              />
            </div>
            <div>
              <label>Children:</label>
              <input
                type="number"
                value={room.children}
                onChange={(e) => handleRoomDetailsChange(index, 'children', e.target.value)}
                min="0"
                max="6"
              />
            </div>
            {room.children > 0 && (
              <div>
                <p>Note: Children ages are at the time of travel.</p>
                {Array.from({ length: room.children }, (_, childIndex) => (
                  <div key={childIndex}>
                    <label>Child {childIndex + 1} Age</label>
                    <input
                      type="number"
                      value={room.childrenAges[childIndex] || ''}
                      onChange={(e) => {
                        const updatedRoomDetails = [...roomDetails];
                        updatedRoomDetails[index].childrenAges[childIndex] = e.target.value;
                        setRoomDetails(updatedRoomDetails);
                      }}
                      min="0"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
