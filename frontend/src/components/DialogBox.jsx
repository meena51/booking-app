import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './Dialog.css'; // Import the CSS file

const DialogBox = ({ open, handleClose, roomDetails, handleIncrementAdults, handleDecrementAdults, handleAddRoom, handleConfirm, handleIncrementChildren, handleDecrementChildren, handleClearRooms, bookingOption }) => {
  // State to track selected child ages
  const [childAges, setChildAges] = useState(Array(roomDetails.length).fill([]));

  const handleChildAgeChange = (roomIndex, age) => {
    const updatedAges = [...childAges];
    updatedAges[roomIndex] = [...updatedAges[roomIndex], age];
    setChildAges(updatedAges);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true} PaperProps={{ className: 'dialogBox' }}>
      <DialogTitle>Manage Rooms</DialogTitle>
      <DialogContent>
        {roomDetails.map((room, index) => (
          <div key={index} className="room-details">
            {/* Room No */}
            <div className="room-number">
              <h4>Room No: {index + 1}</h4>
            </div>

            {/* Adults */}
            <div className="adults-control">
              <span>Adults: {room.adults} </span>
              <button onClick={() => handleIncrementAdults(index)}>+</button>
              <button onClick={() => handleDecrementAdults(index)}>-</button>
            </div>

            {/* Children */}
            <div className="children-control">
              <span>Children: {room.children} </span>
              <button onClick={() => handleIncrementChildren(index)}>+</button>
              <button onClick={() => handleDecrementChildren(index)}>-</button>
            </div>

            {/* ChildAge Dropdown (Shown when children > 0) */}
            {room.children > 0 && (
              <div className="child-age">
                <span style={{ fontWeight: 'bold' }}>Note: Children ages are at time of travel.</span>
                <label>Child Age:</label>
                <select onChange={(e) => handleChildAgeChange(index, e.target.value)}>
                  {bookingOption==="Hotel" && (roomDetails.length === 1 && room.children > 0 && (
                    <>
                      <option value="">Select Age</option>
                      <option value="Under 2">Under 2</option>
                      <option value="2 to 17">2 to 17</option>
                    </>
                  ))}
                  {bookingOption!=="Hotel" && ((roomDetails.length > 1 || room.children > 0) && (
                    <>
                      <option value="">Select Age</option>
                      <option value="Under 2 in lap">Under 2 in lap</option>
                      <option value="Under 2 in seat">Under 2 in seat</option>
                      <option value="2 to 17">2 to 17</option>
                    </>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
        <Button onClick={handleAddRoom}>Add Room</Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClearRooms} color="secondary">Clear</Button>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleConfirm} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
