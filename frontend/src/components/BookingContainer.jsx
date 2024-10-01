import React, { useState } from "react";
import { Grid, Autocomplete, TextField, Container, IconButton, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "./BookingContainer.css";
import { format } from "date-fns";

import DialogBox from "./DialogBox";
import ErrorDialog from "./ErrorDialog";

const BookingContainer = () => {
  const today = new Date();
  const defaultRoomDetails = [{ adults: 1, children: 0, childAges: [] }];
  const formattedDate = format(today, "yyyy-MM-dd");
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000));
  const [bookingOption, setBookingOption] = useState("Hotel+Flight");
  const [open, setOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState([
    { adults: 1, children: 0, childAges: [] },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [departingFrom, setDepartingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Dialog control
  
  const countries = [
    { label: "New York", code: "NY" },
    { label: "India", code: "IN" },
    { label: "Canada", code: "CA" },
  ];

  const handleIncrement = (type) => {
    if (type === "rooms") {
      
      handleClickOpen();
    }
    if (type === "adults") {
      handleClickOpen();
    }
    if (type === "children") {
      handleClickOpen();
    };
  };

  const handleDecrement = (type) => {
    if (type === "rooms" && rooms > 1) {
      
      handleClickOpen();
    }
    if (type === "adults" && adults > 1) {
      handleClickOpen();
    }
    if (type === "children" && children > 0) {
      handleClickOpen();
    };
  };

  const handleBookingOptionChange = (option) => {
    setBookingOption(option);
    if (option === "Hotel") {
      setRoomDetails(defaultRoomDetails); // Reset room details for Hotel
    } else if (option === "Flight") {
      setRoomDetails([{ adults: 2, children: 0 }]); // Customize default values for Flight
    } else if (option === "Hotel+Flight") {
      setRoomDetails([{ adults: 1, children: 0 }]); // Customize for Hotel+Flight
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Adding and removing rooms
  const handleAddRoom = () => {
    setRooms(rooms + 1);
    setRoomDetails([...roomDetails, { adults: 0, children: 0, childAges: [] }]);
  };
  // Function to clear room details
  const handleClearRooms = () => {
    setRoomDetails([{ adults: 1, children: 0, childAge: [] }]); // Reset to one room with default values
  };

  //Increment or decrement adults
  const handleIncrementAdults = (index) => {
    const updatedRoomDetails = roomDetails.map((room, i) => {
      // Check if this is the room being updated and if adults count is less than 8
      if (i === index) {
        if (room.adults >= 8) {
          // If adults count is already 8 or more, do not increment
          return room;
        }
        // Otherwise, increment adults count
        return { ...room, adults: room.adults +1 };
      }
      return room;
    });

    setRoomDetails(updatedRoomDetails);
  };

  const handleDecrementAdults = (index) => {
    const updatedRoomDetails = roomDetails.map((room, i) =>
      i === index && room.adults > 1
        ? { ...room, adults: room.adults - 1 }
        : room
    );
    setRoomDetails(updatedRoomDetails);
  };
  
const handleAdultsChange = (e, index) => {
  const selectedValue = e.target.value === "9" ? 9 : parseInt(e.target.value, 10);

  const updatedRoomDetails = roomDetails.map((room, i) => {
    if (i === index) {
      // Open dialog if the selected value exceeds 8
      if (selectedValue > 8) {
        setOpenDialog(true);
      }
      return { ...room, adults: selectedValue }; // Update the adults value correctly
    }
    return room;
  });

  setRoomDetails(updatedRoomDetails);
};
const handleChildrenChange = (e, index) => {
  const selectedValue = parseInt(e.target.value, 10); // Get the selected value
  const updatedRoomDetails = roomDetails.map((room, i) => {
    if (i === index) {
      const updatedChildren = selectedValue;
      const updatedChildAges =
        updatedChildren > room.children
          ? [...room.childAges, ...Array(updatedChildren - room.children).fill(null)] // Add nulls for new children
          : room.childAges.slice(0, updatedChildren); // Remove extra child ages if children decrease

      return {
        ...room,
        children: updatedChildren,
        childAges: updatedChildAges,
      };
    }
    return room;
  });

  setRoomDetails(updatedRoomDetails); // Update the state with the new room details
};


  
  //handle increment or decrmeent children
  const handleIncrementChildren = (index) => {
    const updatedRoomDetails = roomDetails.map((room, i) =>
      i === index
        ? {
            ...room,
            children: room.children + 1,
            childAges: [...room.childAges, null],
          }
        : room
    );
    setRoomDetails(updatedRoomDetails);
  };

  const handleDecrementChildren = (index) => {
    const updatedRoomDetails = roomDetails.map((room, i) =>
      i === index && room.children > 0
        ? {
            ...room,
            children: room.children - 1,
            childAges: room.childAges.slice(0, -1),
          }
        : room
    );
    setRoomDetails(updatedRoomDetails);
  };
  //handleCHild Age
  const handleChildAgeChange = (roomIndex, childIndex, age) => {
    const updatedRoomDetails = roomDetails.map((room, i) => {
      if (i === roomIndex) {
        const newChildAges = room.childAges.map((childAge, j) =>
          j === childIndex ? age : childAge
        );
        return { ...room, childAges: newChildAges };
      }
      return room;
    });
    setRoomDetails(updatedRoomDetails);
  };
  // Function to calculate total people (adults + children)

  //save button
  const handleConfirm = () => {
    const totalAdults = roomDetails.reduce((acc, room) => acc + room.adults, 0);
    const totalChildren = roomDetails.reduce(
      (acc, room) => acc + room.children,
      0
    );
    const totalPeople = totalAdults + totalChildren;
    if (totalPeople > 8) {
      setErrorMessage("Number of People should not exceed 8");
      {
        alert(errorMessage);
      }
    }
    else{
      setAdults(totalAdults);
    setChildren(totalChildren);
    setRooms(roomDetails.length);
    }

    handleClose(); // Close the dialog
  };
  //for search button disabling and enabling
  const allFieldsFilled = () => {
    // Check if bookingOption is set

    // For Hotel option, no additional fields are required
    if (bookingOption === "Hotel") {
      if (goingTo.trim() !== "") {
        return true;
      } 
    }

    // For Flight option, check if "Departing From" and other required fields are filled
    if (bookingOption === "Flight" || bookingOption === "Hotel+Flight") {
      // Ensure all required fields are filled
      if (departingFrom.trim() !== "" && goingTo.trim() !== "") {
        return true;
      }
    }

    // For Hotel+Flight option, check if "Departing From", "Going To", and other required fields are filled

    // Default case if bookingOption is not set
    return false;
  };
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (allFieldsFilled()) {
      let url = "";

      if (bookingOption === "Flight") {
        url = `/flights.php?`;
        url += `fromLocation=${encodeURIComponent(departingFrom)}`; // Encode and append departing location
        url += `&toLocation=${encodeURIComponent(goingTo)}`; // Encode and append destination
        url += `&tripType=flight`;
        // Append other parameters as needed
        url += `&fd=${startDate}`; // Flight departure date
        url += `&td=${endDate}`; // Flight return date
      } else if (bookingOption === "Hotel") {
        url = `/hotels.php?`;
        url += `location=${encodeURIComponent(goingTo)}`;
        url += `&fd=${startDate}`; // Flight departure date
        url += `&td=${endDate}`; // Example parameter
      } else if (bookingOption === "Hotel+Flight") {
        url = `/packages.php?`;
        url += `fromLocation=${encodeURIComponent(departingFrom)}`;
        url += `&toLocation=${encodeURIComponent(goingTo)}`;
        url += `&fd=${startDate}`; // Flight departure date
        url += `&td=${endDate}`;
        url +=`&searchflights`
      }

      // Perform the redirect
      window.location.href = url; // Redirect to constructed URL
    } else {
      // Set error message
      setOpenDialog(true); // Open dialog
    }
  };

  return (
    <Container maxWidth="lg" className="booking-container">
      <Grid container spacing={2}>
        {/* First Column: Booking Options and Input Fields */}
        <Grid item xs={12} sm={12} md={6} lg={8}>
          <Grid container spacing={2} className="button-container">
            <Grid item>
              <button
                className={`custom-btn ${
                  bookingOption === "Hotel+Flight" ? "selected" : ""
                }`}
                onClick={() => handleBookingOptionChange("Hotel+Flight")}
                disabled={bookingOption === "Hotel+Flight"}
              >
                Hotel+Flight
              </button>
            </Grid>
            <Grid item>
              <button
                className={`custom-btn ${
                  bookingOption === "Hotel" ? "selected" : ""
                }`}
                onClick={() => handleBookingOptionChange("Hotel")}
                disabled={bookingOption === "Hotel"}
              >
                Hotel
              </button>
            </Grid>
            <Grid item>
              <button
                className={`custom-btn ${
                  bookingOption === "Flight" ? "selected" : ""
                }`}
                onClick={() => handleBookingOptionChange("Flight")}
                disabled={bookingOption === "Flight"}
              >
                Flight
              </button>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Show 'Departing From' only if Flight or Hotel+Flight is selected */}
            {bookingOption !== "Hotel" ? (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) =>
                    `${option.label} (${option.code})`
                  }
                  onChange={(event, newValue) => {
                    // Check if an option was selected
                    if (newValue) {
                      setDepartingFrom(newValue.label); // Update the state to the selected option's label
                    } else {
                      setDepartingFrom(""); // Reset if no option is selected
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={departingFrom}
                      {...params}
                      label="Departing From"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      InputProps={{
                        ...params.InputProps,
                        style: { color: "#fff" },
                      }}
                      InputLabelProps={{ style: { color: "#fff" } }}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                      }}
                    />
                  )}
                />
              </Grid>
            ) : (
              <Grid item xs={12} lg={3} sm={12} md={6}>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) =>
                    `${option.label} (${option.code})`
                  }
                  onChange={(event, newValue) => {
                    // Check if an option was selected
                    if (newValue) {
                      setGoingTo(newValue.label); // Update the state to the selected option's label
                    } else {
                      setGoingTo(""); // Reset if no option is selected
                    }
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      value={goingTo}
                      {...params}
                      label="Going To"
                      variant="outlined"
                      margin="normal"
                      InputProps={{
                        ...params.InputProps,
                        style: { color: "#fff" },
                      }}
                      InputLabelProps={{ style: { color: "#fff" } }}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                      }}
                    />
                  )}
                />
              </Grid>
            )}

            {/* Start Date and End Date are always visible */}
            <Grid item xs={12} lg={4} sm={12} md={6}>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff" },
                  inputProps: { min: formattedDate },
                }}
                fullWidth
                margin="normal"
                variant="outlined"
                value={format(startDate, "yyyy-MM-dd")}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4} sm={12} md={6}>
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff" },
                  inputProps: { min: formattedDate },
                }}
                fullWidth
                margin="normal"
                variant="outlined"
                value={format(endDate, "yyyy-MM-dd")}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                }}
              />
            </Grid>

            {/* Display 'Going To' field in the correct position if Hotel+Flight or Flight is selected */}
            {bookingOption !== "Hotel" && (
              <Grid item xs={12} lg={3} sm={12} md={6}>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) =>
                    `${option.label} (${option.code})`
                  }
                  onChange={(event, newValue) => {
                    // Check if an option was selected
                    if (newValue) {
                      setGoingTo(newValue.label); // Update the state to the selected option's label
                    } else {
                      setGoingTo(""); // Reset if no option is selected
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={goingTo}
                      {...params}
                      label="Going To"
                      variant="outlined"
                      margin="normal"
                      fullWidth // This should be here
                      InputProps={{
                        ...params.InputProps,
                        style: { color: "#fff" },
                      }}
                      InputLabelProps={{ style: { color: "#fff" } }}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "white",
                          },
                      }}
                    />
                  )}
                />
              </Grid>
            )}

            {/* Rooms, Adults, and Children fields */}
            {bookingOption !== "Flight" && (
              <Grid item xs={12} lg={3} sm={12} md={6}>
                <div className="counter">
                  <span>Rooms</span>
                  <div className="counter-buttons">
                    <IconButton
                      onClick={() => handleDecrement("rooms")}
                      sx={{ color: "#fff" }}
                    >
                      <Remove />
                    </IconButton>
                    <span>{rooms}</span>
                    <IconButton
                      onClick={() => handleIncrement("rooms")}
                      sx={{ color: "#fff" }}
                    >
                      <Add />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            )}
            <Grid item xs={12} lg={3} sm={12} md={6}>
              <div className="counter">
                <span>Adults</span>
                <div className="counter-buttons">
                  <IconButton
                    onClick={() => handleDecrement("adults")}
                    sx={{ color: "#fff" }}
                  >
                    <Remove />
                  </IconButton>
                  <span>
                    {bookingOption === "Flight" ? adults : adults + 1}
                  </span>

                  <IconButton
                    onClick={() => handleIncrement("adults")}
                    sx={{ color: "#fff" }}
                  >
                    <Add />
                  </IconButton>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} lg={3} sm={12} md={6}>
              <div className="counter">
                <span>Children</span>
                <div className="counter-buttons">
                  <IconButton
                    onClick={() => handleDecrement("children")}
                    sx={{ color: "#fff" }}
                  >
                    <Remove />
                  </IconButton>
                  <span>{children}</span>
                  <IconButton
                    onClick={() => handleIncrement("children")}
                    sx={{ color: "#fff" }}
                  >
                    <Add />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* Dialog box */}
        <DialogBox
          open={open}
          handleClose={handleClose}
          roomDetails={roomDetails}
          handleIncrementAdults={handleIncrementAdults}
          handleDecrementAdults={handleDecrementAdults}
          handleAddRoom={handleAddRoom}
          handleConfirm={handleConfirm}
          handleIncrementChildren={handleIncrementChildren}
          handleDecrementChildren={handleDecrementChildren}
          handleClearRooms={handleClearRooms}
          bookingOption={bookingOption}
          handleChildAgeChange={handleChildAgeChange}
          handleAdultsChange={handleAdultsChange}
          handleChildrenChange={handleChildrenChange}
        />

        {/* Second Column: Search Button and Contact Info */}
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" color="white" gutterBottom>
            Question?Call
          </Typography>
          <a href="" style={{ color: "#fff" }}>
            888.444.5555
          </a>
          <button className="custom-btn" onClick={handleSearch}>
            {bookingOption === "Hotel" && "View Hotels"}
            {bookingOption === "Flight" && "Search"}
            {bookingOption === "Hotel+Flight" && "View Packages"}
          </button>
          <ErrorDialog open={openDialog} setOpenDialog={setOpenDialog} dialogMessage="Please fill all the required details"/>
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingContainer;
