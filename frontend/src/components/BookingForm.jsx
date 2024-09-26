import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css'; // Ensure you have CSS for styling

const BookingForm = () => {
  const [bookingType, setBookingType] = useState('flight');
  const [departingFrom, setDepartingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const [roomDetails, setRoomDetails] = useState([{ adults: 2, children: 0, childrenAges: [] }]);
  const [totalPeople, setTotalPeople] = useState(2);
  const [warningMessage, setWarningMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const navigate = useNavigate();

  const countries = [
    { name: 'United States', code: 'US' },
    { name: 'India', code: 'IN' },
    { name: 'Canada', code: 'CA' },
  ];

  useEffect(() => {
    const total = roomDetails.reduce((sum, room) => sum + room.adults + room.children, 0);
    setTotalPeople(total);
    setWarningMessage(total > 8 ? 'The total number of people (Adults + Children) cannot exceed 8.' : '');
  }, [roomDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goingTo || !startDate || !endDate) {
      alert('Please fill out all required fields.');
      return;
    }

    let url = '';
    if (bookingType === 'flight') {
      url = `/flights.php?toLocation=${goingTo}&fromLocation=${departingFrom}&fd=${startDate}&td=${endDate}`;
    } else if (bookingType === 'hotel') {
      url = `/hotels.php?hotelTo=${goingTo}&rooms=${rooms}&fd=${startDate}&td=${endDate}`;
    } else if (bookingType === 'hotel+flight') {
      url = `/packages.php?toLocation=${goingTo}&fromLocation=${departingFrom}&rooms=${rooms}&fd=${startDate}&td=${endDate}`;
    }

    navigate(url);
  };

  const handleRoomsChange = (change) => {
    const newRooms = rooms + change;
    if (newRooms >= 1) {
      setRooms(newRooms);
      if (change > 0) {
        setShowPopup(true);
      }
    }
  };

  const handleRoomDetailsChange = (index, field, value) => {
    const updatedRoomDetails = [...roomDetails];
    if (field === 'children' && value > 0) {
      updatedRoomDetails[index].childrenAges = Array.from({ length: value }, () => '');
    } else if (field === 'children' && value === 0) {
      updatedRoomDetails[index].childrenAges = [];
    }
    updatedRoomDetails[index][field] = parseInt(value);
    setRoomDetails(updatedRoomDetails);
  };

  const handleChildAgeChange = (roomIndex, childIndex, value) => {
    const updatedRoomDetails = [...roomDetails];
    updatedRoomDetails[roomIndex].childrenAges[childIndex] = value;
    setRoomDetails(updatedRoomDetails);
  };

  const togglePopup = (index) => {
    setSelectedRoomIndex(index);
    setShowPopup(!showPopup);
  };

  const increment = (field) => {
    const updatedRoomDetails = [...roomDetails];
    updatedRoomDetails[selectedRoomIndex][field] += 1;
    setRoomDetails(updatedRoomDetails);
  };

  const decrement = (field) => {
    const updatedRoomDetails = [...roomDetails];
    if (updatedRoomDetails[selectedRoomIndex][field] > 0) {
      updatedRoomDetails[selectedRoomIndex][field] -= 1;
      setRoomDetails(updatedRoomDetails);
    }
  };

  return (
    <div>
      <h1>What do you want to book?</h1>
      <div className="booking-options">
        <button onClick={() => setBookingType('flight')} className={bookingType === 'flight' ? 'highlight' : ''}>Flight Only</button>
        <button onClick={() => setBookingType('hotel')} className={bookingType === 'hotel' ? 'highlight' : ''}>Hotel Only</button>
        <button onClick={() => setBookingType('hotel+flight')} className={bookingType === 'hotel+flight' ? 'highlight' : ''}>Hotel + Flight</button>
      </div>

      <form onSubmit={handleSubmit}>
        {bookingType !== 'hotel' && (
          <div>
            <label>Departing From</label>
            <select value={departingFrom} onChange={(e) => setDepartingFrom(e.target.value)}>
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Going To</label>
          <select value={goingTo} onChange={(e) => setGoingTo(e.target.value)}>
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.code})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        {(bookingType === 'hotel' || bookingType === 'hotel+flight') && (
          <div>
            <label>Rooms</label>
            <button type="button" onClick={() => handleRoomsChange(-1)}>-</button>
            <span>{rooms}</span>
            <button type="button" onClick={() => handleRoomsChange(1)}>+</button>
          </div>
        )}

        {roomDetails.map((room, index) => (
          <div key={index}>
            <div>
              <label>Adults</label>
              <button type="button" onClick={() => decrement('adults')}>-</button>
              <span>{room.adults}</span>
              <button type="button" onClick={() => increment('adults')}>+</button>
            </div>
            <div>
              <label>Children</label>
              <button type="button" onClick={() => decrement('children')}>-</button>
              <span>{room.children}</span>
              <button type="button" onClick={() => increment('children')}>+</button>
              {room.children === '6+' && <p>The number of children cannot exceed 6.</p>}
            </div>

            {/* Show children's ages if children are present */}
            {room.children > 0 && (
              <div>
                {Array.from({ length: room.children }, (_, childIndex) => (
                  <div key={childIndex}>
                    <label>Child {childIndex + 1} Age</label>
                    <select
                      value={room.childrenAges[childIndex] || ''}
                      onChange={(e) => handleChildAgeChange(index, childIndex, e.target.value)}
                    >
                      <option value="">Select age</option>
                      <option value="Under 2">Under 2</option>
                      <option value="2 to 17">2 to 17</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {warningMessage && <p style={{ color: 'red' }}>{warningMessage}</p>}

        <button type="submit">Submit</button>
      </form>

      {/* Popup for editing room details */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add Room {rooms}</h3>
            <div>
              <label>Adults</label>
              <button type="button" onClick={() => decrement('adults')}>-</button>
              <span>{roomDetails[selectedRoomIndex].adults}</span>
              <button type="button" onClick={() => increment('adults')}>+</button>
            </div>
            <div>
              <label>Children</label>
              <button type="button" onClick={() => decrement('children')}>-</button>
              <span>{roomDetails[selectedRoomIndex].children}</span>
              <button type="button" onClick={() => increment('children')}>+</button>
            </div>
            <button onClick={() => {
              setRoomDetails((prev) => {
                const newDetails = [...prev];
                newDetails[selectedRoomIndex] = { adults: roomDetails[selectedRoomIndex].adults, children: roomDetails[selectedRoomIndex].children, childrenAges: [] };
                return newDetails;
              });
              togglePopup(selectedRoomIndex);
            }}>Save</button>
            <button onClick={() => togglePopup(selectedRoomIndex)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
