import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
const TimeContext = React.createContext();

export default function Home() {
    const [inputDistance, setDistance] = useState("");
    const [inputHour, setHour] = useState("");
    const [inputMinute, setMinute] = useState("");
    const [selectedOption, setSelectedOption] = useState("Walking");

    const navigate = useNavigate();

    const inputStyle = {
        width: "40px",
        marginRight: "10px",
        padding: "10px"
    };

    function handleSubmit(method)  {
      if (!selectedOption) {
        alert("Please select an option before submitting!");
        return;
      }
      if (method === "time") { //distance -> time 
        if (!inputDistance) {
          alert("Please select a distance option before submitting");
          return;
        }
        navigate("/conversion", { state: {hours: null, minutes: null, selectedOption, method: "Distance -> Time", miles: inputDistance} });
        return;
      } else { //time -> distance
        if (!inputHour || !inputMinute) {
          alert("Please select the hours and minutes before submitting!")
          return;
        }
          navigate("/conversion", { state: {hours: inputHour, minutes: inputMinute, selectedOption, method: "Time -> Distance", miles: null} });
        }
    }

    return (
      <TimeContext.Provider value={{ inputHour, inputMinute }}>
        <div className="row convert-info" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
        <h3 className="inline-text">Distance → Time</h3>
        <label>
        <input className="inline-input"
        type="number" 
        value= {inputDistance}
        style={{...inputStyle, width: "50px"}}
        onChange = {(e) => setDistance(Math.max(0, e.target.value))} 
        />
        miles
        </label>
        <button onClick={() => handleSubmit("time")}>Submit</button>
        </div>
        <div className="row convert-info" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
        <h3 className="inline-text">Time → Distance</h3>
        <label>
          <input
            type="number"
            value={inputHour}
            style={inputStyle}
            onChange={(e) => setHour(Math.max(0, e.target.value))}
          />
            hours
        </label>
        <label>
          <input
            type="number"
            value={inputMinute}
            style={inputStyle}
            onChange={(e) => setMinute(Math.max(0, e.target.value))}
          />
            minutes
        </label>
        <button onClick={() => handleSubmit("distance")}>Submit</button>
        </div>
 {/*Dropdown menu */}
 <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
<select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
  <option value="Walking">Walking</option>
  <option value="Evolve Bamboo GTR Skateboard">Evolve Bamboo GTR Skateboard</option>
  <option value="Segway Ninebot S-PLUS">Segway Ninebot S-PLUS</option>
  <option value="Razor Metro HD Scooter">Razor Metro HD Scooter</option>
  <option value="Hovertrax Hoverboard">Hovertrax Hoverboard</option>
</select>

 </div>
    </TimeContext.Provider>
    );
}
