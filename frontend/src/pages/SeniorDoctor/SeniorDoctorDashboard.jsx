import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

export default function SeniorDoctorDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("waiting");

  const current = new Date();

  const formattedDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const patients = [
    {
      token: 1,
      pid: "P001",
      pname: "John Doe",
      gender: "Male",
      blood: "O+",
      date: "2026-06-15",
      time: "9:00 AM",
      status: false,
      dob: "1985-04-12",
      phone: "9001234567",
      notes:
        "Patient recovering well. Continue medication.",
      observations:
        "Patient complains of chest pain and shortness of breath.",
      bp: "120/80",
      pulse: "72 bpm",
      temp: "98.6°F",
      weight: "75 kg",
    },
    {
      token: 2,
      pid: "P002",
      pname: "Priya Sharma",
      gender: "Female",
      blood: "A+",
      date: "2026-06-15",
      time: "9:30 AM",
      status: false,
      dob: "1992-08-25",
      phone: "9876543210",
      notes: "Responding well to treatment.",
      observations:
        "Mild fever and fatigue.",
      bp: "118/76",
      pulse: "78 bpm",
      temp: "99.1°F",
      weight: "62 kg",
    },
    {
      token: 3,
      pid: "P003",
      pname: "Ravi Kumar",
      gender: "Male",
      blood: "B+",
      date: "2026-06-15",
      time: "10:00 AM",
      status: false,
      dob: "1972-01-15",
      phone: "9003456789",
      notes:
        "Stable condition. Under observation.",
      observations:
        "History of hypertension.",
      bp: "130/85",
      pulse: "74 bpm",
      temp: "98.4°F",
      weight: "81 kg",
    },
    {
      token: 4,
      pid: "P004",
      pname: "Anjali Gupta",
      gender: "Female",
      blood: "AB+",
      date: "2026-06-15",
      time: "10:30 AM",
      status: true,
      dob: "1988-11-05",
      phone: "9812345678",
      notes:
        "Post-surgery recovery progressing well.",
      observations:
        "No signs of infection.",
      bp: "115/72",
      pulse: "70 bpm",
      temp: "98.2°F",
      weight: "58 kg",
    },
    {
      token: 5,
      pid: "P005",
      pname: "Suresh Rao",
      gender: "Male",
      blood: "AB+",
      date: "2026-06-15",
      time: "11:00 AM",
      status: false,
      dob: "1968-09-18",
      phone: "9123456780",
      notes:
        "Diabetic patient. Monitor sugar levels.",
      observations:
        "Occasional dizziness reported.",
      bp: "140/90",
      pulse: "80 bpm",
      temp: "98.7°F",
      weight: "84 kg",
    },
  ];

  const waitingCount = patients.filter(
    (patient) => !patient.status
  ).length;

  const completedCount = patients.filter(
    (patient) => patient.status
  ).length;

  const filteredPatients = patients.filter(
    (patient) =>
      activeTab === "waiting"
        ? !patient.status
        : patient.status
  );

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden p-2 border rounded-lg bg-white"
            >
              ☰
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Senior Doctor Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                {formattedDate} • Patient Queue
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() =>
              setActiveTab("waiting")
            }
            className={`px-5 py-3 rounded-xl font-medium transition ${
              activeTab === "waiting"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Waiting ({waitingCount})
          </button>

          <button
            onClick={() =>
              setActiveTab("completed")
            }
            className={`px-5 py-3 rounded-xl font-medium transition ${
              activeTab === "completed"
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-600">
            <div>Token</div>
            <div>PID</div>
            <div>Patient</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {filteredPatients.map(
            (patient) => (
              <div
                key={patient.pid}
                className="grid grid-cols-7 px-6 py-4 border-t items-center"
              >
                <div>
                  #{patient.token}
                </div>

                <div>{patient.pid}</div>

                <div>
                  {patient.pname}
                </div>

                <div>{patient.date}</div>

                <div>{patient.time}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status
                      ? "Completed"
                      : "Waiting"}
                  </span>
                </div>

                <div>
                  <button
                    onClick={() =>
                      navigate(
                        `/senior-dashboard/${patient.pid}`,
                        {
                          state: patient,
                        }
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Open Consultation
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredPatients.map(
            (patient) => (
              <div
                key={patient.pid}
                className="bg-white rounded-xl shadow-sm p-5"
              >
                <div className="space-y-2">
                  <p>
                    <strong>
                      Token:
                    </strong>{" "}
                    #{patient.token}
                  </p>

                  <p>
                    <strong>
                      PID:
                    </strong>{" "}
                    {patient.pid}
                  </p>

                  <p>
                    <strong>
                      Patient:
                    </strong>{" "}
                    {patient.pname}
                  </p>

                  <p>
                    <strong>
                      Date:
                    </strong>{" "}
                    {patient.date}
                  </p>

                  <p>
                    <strong>
                      Time:
                    </strong>{" "}
                    {patient.time}
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {patient.status
                      ? "Completed"
                      : "Waiting"}
                  </span>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/senior-dashboard/${patient.pid}`,
                      {
                        state: patient,
                      }
                    )
                  }
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                >
                  Open Consultation
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}