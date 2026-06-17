import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Medicines from "../NursePage/components/Medicines";
import Procedure from "../NursePage/components/Procedure";

export default function SeniorDoctorConsultation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consultation, setConsultation] = useState("");
  const [saved, setSaved] = useState(false);
  const [patientType, setPatientType] = useState("OP");

  const patient = location.state || {
    pid: "P005",
    pname: "Suresh Rao",
    dob: "12/05/1995",
    gender: "Male",
    blood: "AB+",
    phone: "9876543210",
    bp: "120/80",
    pulse: "72 bpm",
    temp: "98.6°F",
    weight: "75 kg",
    observations: "Patient is stable and recovering well.",
    complaints: "Chest pain, fatigue and occasional dizziness.",
    token: "4",
    time: "11:00 AM",
    date: "21/06/2026",
  };

  return (
    <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Back to Queue
          </button>

          <span className="text-gray-400">&gt;</span>

          <span className="font-medium text-gray-900">{patient.pname}</span>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
          {/* Patient Info */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm p-6 self-start">
            <h2 className="text-xl font-semibold mb-6">Patient Information</h2>

            <div className="space-y-4">
              <InfoRow label="PID" value={patient.pid} />

              <InfoRow label="Name" value={patient.pname} />

              <InfoRow label="DOB" value={patient.dob} />

              <InfoRow label="Gender" value={patient.gender} />

              <InfoRow label="Blood Group" value={patient.blood} />

              <InfoRow label="Phone" value={patient.phone} />

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Type</span>

                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    patientType === "IP"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {patientType}
                </span>
              </div>
            </div>

            <button
              onClick={() => setPatientType(patientType === "IP" ? "OP" : "IP")}
              className={`mt-6 w-full py-3 rounded-xl font-medium ${
                patientType === "IP"
                  ? "border border-green-300 text-green-700 hover:bg-green-50"
                  : "border border-purple-300 text-purple-700 hover:bg-purple-50"
              }`}
            >
              {patientType === "IP" ? "Change To OP" : "Change To IP"}
            </button>
          </div>

          {/* Vitals + Complaints + JD Observation */}
          <div className="xl:col-span-6 space-y-6">
            {/* Vitals */}
            <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm p-6 self-start">
              <h2 className="text-xl font-semibold mb-4">Vitals</h2>

              <div className="grid grid-cols-2 gap-3">
                <VitalCard title="BP" value={patient.bp} />

                <VitalCard title="Pulse" value={patient.pulse} />

                <VitalCard title="Temperature" value={patient.temp} />

                <VitalCard title="Weight" value={patient.weight} />
              </div>
            </div>

            {/* Complaints & Observation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[250px]">
                <h3 className="font-semibold text-lg mb-3">
                  Patient Complaints
                </h3>

                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words overflow-y-auto max-h-60">
                  {patient.complaints}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[250px]">
                <h3 className="font-semibold text-lg mb-3">JD Observations</h3>

                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words overflow-y-auto max-h-60">
                  {patient.observations}
                </div>
              </div>
            </div>
          </div>

          {/* Appointment */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-sm p-6 self-start">
            <h2 className="text-xl font-semibold mb-6">Appointment Details</h2>

            <div className="space-y-4">
              <InfoRow label="Token" value={`#${patient.token}`} />

              <InfoRow label="Time" value={patient.time} />

              <InfoRow label="Date" value={patient.date} />

              <InfoRow label="Specialization" value="Cardiology" />
            </div>
          </div>
        </div>

        {/* Prescription */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Prescription</h2>

          <Medicines isSeniorDoctor />
        </div>

        {/* Procedures - New Row */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Procedures</h2>

          <Procedure isSeniorDoctor />
        </div>

        {/* Consultation Notes */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-24">
          <h2 className="text-xl font-semibold mb-4">Consultation Notes</h2>

          <textarea
            rows={6}
            value={consultation}
            onChange={(e) => setConsultation(e.target.value)}
            placeholder="Enter consultation notes..."
            className="w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => {
              setSaved(true);

              setTimeout(() => {
                setSaved(false);
              }, 3000);
            }}
            className={`px-8 py-3 rounded-xl shadow-lg text-white font-medium ${
              saved ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saved ? "✓ Changes Saved" : "Save Consultation"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>

      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function VitalCard({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className="font-semibold text-lg mt-1">{value}</h3>
    </div>
  );
}
