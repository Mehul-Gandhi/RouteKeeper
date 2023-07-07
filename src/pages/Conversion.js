import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import '../App.css';
import walkingImg from "../../src/assets/images/walking.jpg";
import skateboard from "../../src/assets/images/skateboard.jpg";
import scooter from "../../src/assets/images/scooter.jpg";
import hoverboard from "../../src/assets/images/hoverboard.jpg";
import segway from "../../src/assets/images/segway.jpg";

export default function Conversion() {
  const location = useLocation();
  const { hours, minutes, selectedOption, miles, method } = location.state;

  const [divs, setDivs] = useState([]);
  const [prevTrips, setTrips] = useState([]);

  useEffect(() => {
    const convert = (hours, minutes, method, selectedOption, miles) => {
      const modes = [
        { mode: "Walking", img: walkingImg, speed: 3.1 },
        { mode: "Evolve Bamboo GTR Skateboard", img: skateboard, speed: 27 },
        { mode: "Segway Ninebot S-PLUS", img: segway, speed: 12 },
        { mode: "Razor Metro HD Scooter", img: scooter, speed: 15.5 },
        { mode: "Hovertrax Hoverboard", img: hoverboard, speed: 9 },
      ];

      let newDivs;
      let tempDiv;

      if (method === "Time -> Distance") {
        hours = ((hours /1) + (minutes / 60));
        tempDiv = modes.map(({ mode, img, speed }) => ({
          mode,
          img,
          speed: (hours * speed).toFixed(2)
        })).sort((a, b) => a.speed - b.speed);          

        newDivs = tempDiv.map(({ mode, img, speed }) => (
          <div key={mode} className="box">
            <img src={img} alt={mode} />
            <div className="transp">
              <h1>{mode}</h1>
              <h1>{(speed / 1).toFixed(2) + " miles"} </h1>
              <button onClick={() => storeTrip(mode, (speed / 1).toFixed(2) + " miles")}>Submit</button>
            </div>
          </div>
        ));
        // Move the last entry to the first position
    if (newDivs.length > 1) {
    const lastEntry = newDivs.pop();
    newDivs.unshift(lastEntry);
    }
      } else {
        tempDiv = modes.map(({ mode, img, speed }) => ({
          mode,
          img,
          minutes: Math.floor(((miles / speed) * 60))
        })).sort((a, b) => a.minutes - b.minutes);   
        newDivs = tempDiv.map(({ mode, img, minutes }) => (
          <div key={mode} className="box">
            <img src={img} alt={mode} />
            <h1>{mode}</h1>
            <button onClick={() => storeTrip(mode, 0)}>Submit</button>
            <h1>
              {Math.abs(minutes) > 60 ? (
                <span>
                  {Math.floor(Math.abs(minutes) / 60)} hour<span>{(Math.floor(Math.abs(minutes) / 60) > 1) && "s"}</span> and {(Math.abs(minutes) % 60)} minutes
                </span>
              ) : (
                <span>{minutes} minutes</span>
              )}
            </h1>
          </div>
        ));
        if (newDivs.length > 1) {
          const lastEntry = newDivs.pop();
          newDivs.unshift(lastEntry);
          }
      }
      const index = tempDiv.findIndex((mode) => mode.mode === selectedOption);
      [newDivs[0], newDivs[index]] = [newDivs[index], newDivs[0]];

      setDivs(newDivs);
    };

    convert(hours, minutes, method, selectedOption, miles);
  }, [hours, minutes, selectedOption, method, miles]);

  const storeTrip = (mode, distance) => {
    const trip = {
      mode,
      distance,
      timestamp: new Date().toISOString()
    };
  
    const storedTrips = sessionStorage.getItem("prevTrips");
    const prevTrips = storedTrips ? JSON.parse(storedTrips) : [];
    const updatedTrips = [...prevTrips, trip];
  
    sessionStorage.setItem("prevTrips", JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
  };



  // useEffect(() => {
  //   sessionStorage.setItem("prevTrips", JSON.stringify(prevTrips));
  // }, [prevTrips]);

  const renderDivs = () => {
    if (divs.length === 0) {
      return <div>No results found.</div>;
    }

    return <div className="container">{divs}</div>;
  };

  return (
    <div>
      <div className="info">Mode: {method}</div>
      {miles && <span className="info">{miles} miles </span>}
      {hours && minutes && <span className="info">{hours} hours and {minutes} minutes</span>}
      {renderDivs()}
    </div>
  );
}
