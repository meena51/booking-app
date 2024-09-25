import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FlightOnly from './components/FlightOnly';
import HotelOnly from './components/HotelOnly';
import HotelFlight from './components/HotelFlight';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/flights' element={<FlightOnly/>}/>
        <Route path='/hotels' element={<HotelOnly/>}/>
        <Route path='/hotelflight' element={<HotelFlight/>}/>
      </Routes>
    </div>
  );
}

export default App;
