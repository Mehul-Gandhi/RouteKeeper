import React from "react";
import "../App.css"; // Import the CSS file for styling

export default function Trips() {
  const storedTrips = sessionStorage.getItem("prevTrips");
  const prevTrips = storedTrips ? JSON.parse(storedTrips) : [];

  return (
    <div className="trips-container">
      <h1>Previous Trips:</h1>
      {prevTrips.length === 0 ? (
        <div className="no-trips">No previous trips recorded.</div>
      ) : (
        <ul className="trip-list">
          {prevTrips.map((trip, index) => (
            <li key={index} className="trip-card">
              <div className="trip-entry">
                <div className="trip-mode">
                  <strong>Mode:</strong> {trip.mode}
                </div>
                <div className="trip-distance">
                  <strong>Distance:</strong> {trip.distance}
                </div>
                <div className="trip-timestamp">
                  <strong>Timestamp:</strong> {trip.timestamp}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
