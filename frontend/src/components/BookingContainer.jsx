import React, { useState } from 'react';
import { Grid, TextField, Container, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import './BookingContainer.css';
import { format } from 'date-fns';

const BookingContainer = () => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookingOption, setBookingOption] = useState('Hotel+Flight');

  const handleIncrement = (type) => {
    if (type === 'rooms') setRooms(rooms + 1);
    if (type === 'adults') setAdults(adults + 1);
    if (type === 'children') setChildren(children + 1);
  };

  const handleDecrement = (type) => {
    if (type === 'rooms' && rooms > 1) setRooms(rooms - 1);
    if (type === 'adults' && adults > 1) setAdults(adults - 1);
    if (type === 'children' && children > 0) setChildren(children - 1);
  };

  const handleBookingOptionChange = (option) => {
    setBookingOption(option);
  };

  const handleSearch = () => {
    if (bookingOption === 'Hotel' && rooms < 1) {
      alert('Please select at least one room for Hotel booking.');
      return;
    }
    alert(`Searching for ${bookingOption}...`);
  };

  return (
    <Container maxWidth="lg" className="booking-container">
      <Grid container spacing={2}>
        {/* First Column: Booking Options and Input Fields */}
        <Grid item xs={8}>
          <Grid container spacing={2} className="button-container">
            <Grid item>
              <button
                className='custom-btn'
                onClick={() => handleBookingOptionChange('Hotel+Flight')}
                disabled={bookingOption === 'Hotel+Flight'}
              >
                Hotel+Flight
              </button>
            </Grid>
            <Grid item>
              <button
                className='custom-btn'
                onClick={() => handleBookingOptionChange('Hotel')}
                disabled={bookingOption === 'Hotel'}
              >
                Hotel
              </button>
            </Grid>
            <Grid item>
              <button
                className='custom-btn'
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
                <TextField
                  label="Departing From"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { color: '#fff' } }}
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
              </Grid>
            ) : (
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Going To"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { color: '#fff' } }}
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
              </Grid>
            )}

            {/* Start Date and End Date are always visible */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Start Date"
                type="date"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff' } }}
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
                InputProps={{ style: { color: '#fff' } }}
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
                <TextField
                  label="Going To"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { color: '#fff' } }}
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
              </Grid>
            )}

            {/* Rooms, Adults, and Children fields */}
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

            <Grid item xs={12} sm={3}>
              <div className="counter">
                <span>Adults</span>
                <div className="counter-buttons">
                  <IconButton onClick={() => handleDecrement('adults')} sx={{ color: '#fff' }}>
                    <Remove />
                  </IconButton>
                  <span>{adults}</span>
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

        {/* Second Column: Search Button and Contact Info */}
        <Grid item xs={4} container direction="column" alignItems="center" justifyContent="center">
          <Typography variant="h5" color="white" gutterBottom>
            Question?Call 
          </Typography>
          <a href="" style={{ color: "#fff" }}>888.444.5555</a>
          <button className='custom-btn' onClick={handleSearch}>Search</button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookingContainer;
