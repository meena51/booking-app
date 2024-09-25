import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
function Home(){
    return (
        <div>
            <h1>Booking App</h1>
            <div className="booking-options" >
                <Link to='/flights' className="booking-button">Flight</Link>
                <Link to='/hotels' className="booking-button">Hotel</Link>
                <Link to='/hotelflight' className="booking-button">Hotel + Flight</Link>
            </div>
        </div>
    )
}
export default Home