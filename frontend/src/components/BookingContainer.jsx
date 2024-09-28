import React, { useState } from 'react';
import { Grid,Autocomplete, TextField, Container, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './BookingContainer.css';
import { format } from 'date-fns';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select } from '@mui/material';
import DialogBox from './DialogBox';


const BookingContainer = () => {
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd')
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(new Date(today.getDate()+4));
  const [bookingOption, setBookingOption] = useState('Hotel+Flight');
  const [open, setOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState([{ adults: 1, children: 0, childAges: [] }]);
  const [errorMessage, setErrorMessage] = useState('')
  const [error,setError] = useState(false)
  const [departingFrom, setDepartingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  
  const countries = [
    { label: 'New York', code: 'NY' },
    { label: 'India', code: 'IN' },
    { label: 'Canada', code: 'CA' },
  ];

  const handleIncrement = (type) => {
    if (type === 'rooms') {
      setRooms(rooms + 1);
      handleClickOpen();
    }
    if (type === 'adults') setAdults(adults + 1);
    if (type === 'children') setChildren(children + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'rooms' && rooms > 1) {
      setRooms(rooms - 1);
      handleClickOpen();
    }
    if (type === 'adults' && adults > 1) setAdults(adults - 1);
    if (type === 'children' && children > 0) setChildren(children - 1);
  };

  const handleBookingOptionChange = (option) => {
    setBookingOption(option);
  };

  const handleClickOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

// Adding and removing rooms
const handleAddRoom = () => {
  setRooms(rooms + 1);
  setRoomDetails([...roomDetails, { adults: 1, children: 0, childAges: [] }]);
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
      if (room.adults > 8) {
        // If adults count is already 8 or more, do not increment
        return room;
      }
      // Otherwise, increment adults count
      return { ...room, adults: room.adults + 1 };
    }
    return room;
  });

  setRoomDetails(updatedRoomDetails);
};


const handleDecrementAdults = (index) => {
  const updatedRoomDetails = roomDetails.map((room, i) =>
    i === index && room.adults > 1 ? { ...room, adults: room.adults - 1 } : room
  );
  setRoomDetails(updatedRoomDetails);
};
//handle increment or decrmeent children
const handleIncrementChildren = (index) => {
  const updatedRoomDetails = roomDetails.map((room, i) =>
    i === index ? { ...room, children: room.children + 1, childAges: [...room.childAges, null] } : room
  );
  setRoomDetails(updatedRoomDetails);
};

const handleDecrementChildren = (index) => {
  const updatedRoomDetails = roomDetails.map((room, i) =>
    i === index && room.children > 0 ? { ...room, children: room.children - 1, childAges: room.childAges.slice(0, -1) } : room
  );
  setRoomDetails(updatedRoomDetails);
};
//handleCHild Age
const handleChildAgeChange = (roomIndex, childIndex, age) => {
  const updatedRoomDetails = roomDetails.map((room, i) => {
    if (i === roomIndex) {
      const newChildAges = room.childAges.map((childAge, j) => (j === childIndex ? age : childAge));
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
  const totalChildren = roomDetails.reduce((acc, room) => acc + room.children, 0);
  const totalPeople = totalAdults+totalChildren
  if(totalPeople>8){
    setErrorMessage('Number of People should not exceed 8')
    {
      alert(errorMessage)
    }
  }
  setAdults(totalAdults);
  setChildren(totalChildren);
  setRooms(roomDetails.length);

  handleClose();  // Close the dialog
};

const handleSearch = () => {
  const startDateFormatted = format(new Date(startDate), 'yyyy-MM-dd');
  const endDateFormatted = format(new Date(endDate), 'yyyy-MM-dd');
  const roomsParam = `rm=${rooms}`;
  const adultsParam = `ap1=${adults}`;
  const childrenParam = `mp1=${children}`;

  let url = '';

  if (bookingOption === 'Flight') {
    url = `/flights.php?toLocation=${encodeURIComponent(goingTo)}&fromLocation=${encodeURIComponent(departingFrom)}&${roomsParam}&${adultsParam}&${childrenParam}&tripType=flight&fd=${startDateFormatted}&td=${endDateFormatted}`;
  } else if (bookingOption === 'Hotel') {
    url = `/hotels.php?hotelTo=${encodeURIComponent(goingTo)}&${roomsParam}&${adultsParam}&${childrenParam}&tripType=hotel&fd=${startDateFormatted}&td=${endDateFormatted}`;
  } else if (bookingOption === 'Hotel+Flight') {
    url = `/packages.php?toLocation=${encodeURIComponent(goingTo)}&fromLocation=${encodeURIComponent(departingFrom)}&${roomsParam}&${adultsParam}&${childrenParam}&tripType=package&fd=${startDateFormatted}&td=${endDateFormatted}`;
  }

  console.log(url); // You can remove this line once testing is complete

  // Redirect to the constructed URL
  window.location.href = url;
};


  return (
    <Container maxWidth="lg" className="booking-container">
      <Grid container spacing={2}>
        {/* First Column: Booking Options and Input Fields */}
        <Grid item xs={8}>
        <Grid container spacing={2} className="button-container">
  <Grid item>
    <button
      className={`custom-btn ${bookingOption === 'Hotel+Flight' ? 'selected' : ''}`}
      onClick={() => handleBookingOptionChange('Hotel+Flight')}
      disabled={bookingOption === 'Hotel+Flight'}
    >
      Hotel+Flight
    </button>
  </Grid>
  <Grid item>
    <button
      className={`custom-btn ${bookingOption === 'Hotel' ? 'selected' : ''}`}
      onClick={() => handleBookingOptionChange('Hotel')}
      disabled={bookingOption === 'Hotel'}
    >
      Hotel
    </button>
  </Grid>
  <Grid item>
    <button
      className={`custom-btn ${bookingOption === 'Flight' ? 'selected' : ''}`}
      onClick={() => handleBookingOptionChange('Flight')}
      disabled={bookingOption === 'Flight'}
    >
      Flight
    </button>
  </Grid>
</Grid>


          <Grid container spacing={2}>
            {/* Show 'Departing From' only if Flight or Hotel+Flight is selected */}
            {bookingOption !== 'Hotel' ? (
              <Grid item xs={12} sm={3}>
                <Autocomplete
  options={countries}
  getOptionLabel={(option) => `${option.label} (${option.code})`}
  renderInput={(params) => (
    <TextField
     onChange={e=>setDepartingFrom(e.target.value)}
      value={departingFrom}
      {...params}
      label="Departing From"
      variant="outlined"
      margin="normal"
      fullWidth // This should be here
      InputProps={{
        ...params.InputProps,
        style: { color: '#fff' },
      }}
      InputLabelProps={{ style: { color: '#fff' } }}
      sx={{
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
      }}
    />
  )}
/>

              </Grid>
            ) : (
              <Grid item xs={12} sm={3}>
                <Autocomplete
      options={countries}
      getOptionLabel={(option) => `${option.label} (${option.code})`}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="Going To"
          variant="outlined"
          margin="normal"
          InputProps={{
            ...params.InputProps,
            style: { color: '#fff' },
          }}
          InputLabelProps={{ style: { color: '#fff' } }}
          sx={{
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />
      )}
    />
              </Grid>
            )}

            {/* Start Date and End Date are always visible */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' }, inputProps: { min: formattedDate } }}
                margin="normal"
                variant="outlined"
                value={format(startDate, 'yyyy-MM-dd')}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="End Date"
                type="date"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' }, inputProps: { min: formattedDate } }}
                fullWidth
                margin="normal"
                variant="outlined"
                value={format(endDate, 'yyyy-MM-dd')}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                }}
              />
            </Grid>

            {/* Display 'Going To' field in the correct position if Hotel+Flight or Flight is selected */}
            {bookingOption !== 'Hotel' && (
              <Grid item xs={12} sm={3}>
                <Autocomplete
  options={countries}
  getOptionLabel={(option) => `${option.label} (${option.code})`}
  renderInput={(params) => (
    <TextField
    onChange={e=>setGoingTo(e.target.value)}
    value={goingTo}
      {...params}
      label="Going To"
      variant="outlined"
      margin="normal"
      fullWidth // This should be here
      InputProps={{
        ...params.InputProps,
        style: { color: '#fff' },
      }}
      InputLabelProps={{ style: { color: '#fff' } }}
      sx={{
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
      }}
    />
  )}
/>

              </Grid>
            )}

            {/* Rooms, Adults, and Children fields */}
            {bookingOption !== 'Flight' && (
  <Grid item xs={12} sm={3}>
    <div className="counter">
      <span>Rooms</span>
      <div className="counter-buttons">
        <IconButton onClick={() => handleDecrement('rooms')} sx={{ color: '#fff' }}>
          <Remove />
        </IconButton>
        <span>{rooms}</span>
        <IconButton onClick={() => handleIncrement('rooms')} sx={{ color: '#fff' }}>
          <Add />
        </IconButton>
      </div>
    </div>
  </Grid>
)}
            <Grid item xs={12} sm={3}>
              <div className="counter">
                <span>Adults</span>
                <div className="counter-buttons">
                  <IconButton onClick={() => handleDecrement('adults')} sx={{ color: '#fff' }}>
                    <Remove />
                  </IconButton>
                  <span>{bookingOption === 'Flight' ? adults : adults + 1}</span>

                  <IconButton onClick={() => handleIncrement('adults')} sx={{ color: '#fff' }}>
                    <Add />
                  </IconButton>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={3}>
              <div className="counter">
                <span>Children</span>
                <div className="counter-buttons">
                  <IconButton onClick={() => handleDecrement('children')} sx={{ color: '#fff' }}>
                    <Remove />
                  </IconButton>
                  <span>{children}</span>
                  <IconButton onClick={() => handleIncrement('children')} sx={{ color: '#fff' }}>
                    <Add />
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {/* Dialog box */}
        <DialogBox open={open} handleClose={handleClose} roomDetails={roomDetails} handleIncrementAdults={handleIncrementAdults} handleDecrementAdults={handleDecrementAdults} handleAddRoom={handleAddRoom}  handleConfirm={handleConfirm} handleIncrementChildren={handleIncrementChildren} handleDecrementChildren={handleDecrementChildren}
        handleClearRooms={handleClearRooms} bookingOption={bookingOption}/>


        {/* Second Column: Search Button and Contact Info */}
        <Grid item xs={4} container direction="column" alignItems="center" justifyContent="center">
          <Typography variant="h5" color="white" gutterBottom>
            Question?Call 
          </Typography>
          <a href="" style={{ color: "#fff" }}>888.444.5555</a>
          <button className='custom-btn' onClick={handleSearch}>
          {bookingOption === 'Hotel' && 'View Hotels'}
  {bookingOption === 'Flight' && 'Search'}
  {bookingOption === 'Hotel+Flight' && 'View Packages'}
              
      
            </button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingContainer;
