import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pid } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const patient =
    location.state ||
    {
      pid,
      pname: "Unknown Patient",
      gender: "-",
      blood: "-",
      id: "-",
      date: "-",
      medicines: "-",
      procedure: "-",
    };

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 bg-white rounded-lg shadow"
          >
            ☰
          </button>

          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 mb-2"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold text-gray-900">
              Patient Dashboard
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500 mb-6">
          <span>Patient</span>
          <span>{">"}</span>
          <span>{patient.pname}</span>
        </div>

        {/* Room Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Room
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Room {patient.id}
          </h2>
        </div>

        {/* Patient Details */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Patient Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500">Patient ID</p>
              <p className="font-semibold">{patient.pid}</p>
            </div>

            <div>
              <p className="text-gray-500">Patient Name</p>
              <p className="font-semibold">{patient.pname}</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-semibold">{patient.gender}</p>
            </div>

            <div>
              <p className="text-gray-500">Blood Group</p>
              <p className="font-semibold">{patient.blood}</p>
            </div>

            <div>
              <p className="text-gray-500">Admission Date</p>
              <p className="font-semibold">{patient.date}</p>
            </div>
          </div>
        </div>

        {/* Treatment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-3">
              Medicines
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {patient.medicines}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-3">
              Procedures
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {patient.procedure}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}