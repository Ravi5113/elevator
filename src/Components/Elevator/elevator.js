import React, { useState, useEffect } from "react";
import "./Style.css";

const Elevator = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [destinationFloor, setDestinationFloor] = useState(null);
  const [direction, setDirection] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    if (destinationFloor !== null) {
      const distance = Math.abs(destinationFloor - currentFloor);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === null) {
            return distance;
          } else if (prevCountdown === 0) {
            clearInterval(timer);
            setCurrentFloor(destinationFloor);
            setDirection("");
            setDestinationFloor(null);
            updateLog(destinationFloor);
            return null;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 400);

      return () => clearInterval(timer);
    }
  }, [destinationFloor, currentFloor, updateLog]);

  const updateLog = (destinationFloor) => {
    const newLogEntry = {
      numberOfPassengers: Math.floor(Math.random() * 5) + 1,
      fromFloor: currentFloor,
      toFloor: destinationFloor,
      dateTime: new Date().toLocaleString(),
    };
    setLog((prevLog) => [...prevLog, newLogEntry]);
    localStorage.setItem("elevatorLog", JSON.stringify([...log, newLogEntry]));
  };

  const handleButtonClick = (floor) => {
    const floorDifference = Math.abs(floor - currentFloor);
    const newDirection = floor > currentFloor ? "up" : "down";

    setDirection(newDirection);
    setCountdown(floorDifference);
    setDestinationFloor(floor);
  };

  return (
    <div className="elevator">
      <div className="elevator-display">
        {countdown !== null && (
          <div>
            {/* <span>{countdown}</span> */}
            <span className="Arrow">{direction === "up" ? "↑" : "↓"}</span>
          </div>
        )}
      </div>
      <div className="elevator-controls">
        {[...Array(10).keys()].map((floor) => (
          <button
            className="btns"
            key={floor}
            disabled={floor === currentFloor || direction !== ""}
            onClick={() => handleButtonClick(floor)}
          >
            0{floor}
          </button>
        ))}
      </div>

      <div className="elevator-log">
        <h2>Log</h2>
        <table class="passenger-table">
          <thead>
            <tr>
              <th>No. of Passengers</th>
              <th>From Floor</th>
              <th>To Floor</th>
              <th>Date-Time</th>
            </tr>
          </thead>
          <tbody>
            {log.map((entry, index) => (
              <tr key={index}>
                <td>{entry.numberOfPassengers}</td>
                <td>{entry.fromFloor}</td>
                <td>{entry.toFloor}</td>
                <td>{entry.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Elevator;
