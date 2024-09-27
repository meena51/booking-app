import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import BookingForm from './components/BookingForm';
import Example from './components/BookingContainer';

function App() {
  return (
    <div className="App">
      
      <Example/>
    </div>
  );
}

export default App;
