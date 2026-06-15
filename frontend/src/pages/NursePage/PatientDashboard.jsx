import React from "react";
import { useLocation } from "react-router-dom";

export default function PatientDashboard() {
  const location = useLocation();
  const patient = location.state;
  return (
    <div>
      <div className="side-bar">
        <button>Patient</button> {">"} <p>{patient.pname}</p>
      </div>
      <div className="room-card">
        <h2>Room</h2>
        <h1>Room {patient.id}</h1>

      </div>
    </div>
  );
}
