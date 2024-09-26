import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import BookingForm from './components/BookingForm';

function App() {
  return (
    <div className="App">
      <BookingForm/>
    </div>
  );
}

export default App;
