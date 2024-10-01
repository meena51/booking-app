import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./Dialog.css"; // Import the CSS file
import ErrorDialog from "./ErrorDialog";

const DialogBox = ({
  open,
  handleClose,
  roomDetails,
  handleIncrementAdults,
  handleDecrementAdults,
  handleAddRoom,
  handleConfirm,
  handleIncrementChildren,
  handleDecrementChildren,
  handleClearRooms,
  bookingOption,
  handleChildAgeChange,
  handleAdultsChange,
  openDialog, setOpenDialog,
  handleChildrenChange
}) => {
  // const [openDialog, setOpenDialog] = useState(false);
  // State to track selected child ages
  // const [childAges, setChildAges] = useState(Array(roomDetails.length).fill([]));

  // const handleChildAgeChange = (roomIndex, age) => {
  //   const updatedAges = [...childAges];
  //   updatedAges[roomIndex] = [...updatedAges[roomIndex], age];
  //   setChildAges(updatedAges);
  // };
 
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
      PaperProps={{ className: "dialogBox" }}
    >
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
      <span>Adults: </span>
      <select
        value={room.adults || 1} // Ensure the default value is handled properly
        onChange={(e) => handleAdultsChange(e, index)}
      >
        {/* Generate options for values 1 to 8 */}
        {Array.from({ length: 8 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
        {/* Add an option for 9+ */}
        <option value="9">9+</option>
      </select>
    

              {/* Error message if adults exceed 8 */}
              {room.adults > 8 && (
                
              <ErrorDialog open={openDialog} setOpenDialog={setOpenDialog} dialogMessage="Adults should not exceed 8"/>
                
              )}
            </div>

            {/* Children */}
            <div className="children-control">
  <span>Children: </span>
  <select
    value={room.children || 0} // Default to 0 if no value is set
    onChange={(e) => handleChildrenChange(e, index)} // Handle the change
  >
    {/* Generate options for values 0 to 8 */}
    {Array.from({ length: 6 }, (_, i) => (
      <option key={i} value={i}>
        {i}
      </option>
    ))}
    {/* Add an option for 9+ */}
    <option value="6">6+</option>
  </select>
</div>

            {room.children > 6 && (
              <span style={{ color: "red", marginLeft: "10px" }}>
                Children should not exceed 6
              </span>
            )}

            {/* ChildAge Dropdowns (Shown when children > 0) */}
            {room.children > 0 && (
              <div className="child-age">
                {Array.from({ length: room.children }).map((_, childIndex) => (
                  <div key={childIndex} className="child-age-dropdown">
                    <label>Child {childIndex + 1} Age:</label>
                    <select
                      onChange={(e) =>
                        handleChildAgeChange(index, childIndex, e.target.value)
                      }
                      style={{ maxHeight: "150px", overflowY: "auto" }}
                    >
                      <option value="">Select Age</option>
                      {bookingOption === "Hotel" &&
                        roomDetails.length === 1 &&
                        room.children > 0 && (
                          <>
                            <option value="Under 2">Under 2</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                          </>
                        )}

                      {bookingOption !== "Hotel" &&
                        (roomDetails.length > 1 || room.children > 0) && (
                          <>
                            <option value="Under 2 in lap">
                              Under 2 in lap
                            </option>
                            <option value="Under 2 in seat">
                              Under 2 in seat
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                          </>
                        )}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button onClick={handleAddRoom}>Add Room</Button>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClearRooms} color="secondary">
          Clear
        </Button>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleConfirm} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;
