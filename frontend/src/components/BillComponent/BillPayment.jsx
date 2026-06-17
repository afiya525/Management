import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";

export default function BillPayment() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [search, setSearch] = useState("");

  const billSummary = [
    {
      pid: "P001",
      pname: "John Doe",
      total: 700,
      paid: 700,
      pending: 0,
      transactions: [
        {
          id: 1,
          purpose: "Registration",
          amount: 200,
          method: "Cash",
          reference: "-",
          date: "2026-05-20",
          status: "Paid",
        },
        {
          id: 2,
          purpose: "Consultation",
          amount: 500,
          method: "UPI",
          reference: "UPI123456",
          date: "2026-05-20",
          status: "Paid",
        },
      ],
    },
    {
      pid: "P002",
      pname: "Jane Smith",
      total: 700,
      paid: 200,
      pending: 500,
      transactions: [
        {
          id: 1,
          purpose: "Registration",
          amount: 200,
          method: "Cash",
          reference: "-",
          date: "2026-05-21",
          status: "Paid",
        },
        {
          id: 2,
          purpose: "Consultation",
          amount: 500,
          method: "UPI",
          reference: "UPI789456",
          date: "2026-05-21",
          status: "Pending",
        },
      ],
    },
    {
      pid: "P003",
      pname: "Ravi Kumar",
      total: 9000,
      paid: 9000,
      pending: 0,
      transactions: [
        {
          id: 1,
          purpose: "Admission Fee",
          amount: 1000,
          method: "Cash",
          reference: "-",
          date: "2026-05-18",
          status: "Paid",
        },
        {
          id: 2,
          purpose: "MRI Scan",
          amount: 5000,
          method: "Card",
          reference: "TXN123456",
          date: "2026-05-19",
          status: "Paid",
        },
        {
          id: 3,
          purpose: "Consultation",
          amount: 3000,
          method: "UPI",
          reference: "UPI654321",
          date: "2026-05-20",
          status: "Paid",
        },
      ],
    },
    {
      pid: "P005",
      pname: "Suresh Rao",
      total: 8000,
      paid: 8000,
      pending: 0,
      transactions: [
        {
          id: 1,
          purpose: "Admission Fee",
          amount: 1000,
          method: "Cash",
          reference: "-",
          date: "2026-05-15",
          status: "Paid",
        },
        {
          id: 2,
          purpose: "CT Scan",
          amount: 4000,
          method: "Card",
          reference: "TXN789123",
          date: "2026-05-16",
          status: "Paid",
        },
        {
          id: 3,
          purpose: "Procedure Charges",
          amount: 3000,
          method: "UPI",
          reference: "UPI456123",
          date: "2026-05-17",
          status: "Paid",
        },
      ],
    },
  ];

  const filteredPatients =
    billSummary.filter(
      (patient) =>
        patient.pname
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        patient.pid
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
              Bills & Payments
            </h1>

            <p className="text-gray-500 mt-1">
              Manage patient billing and
              payments
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <input
            type="text"
            placeholder="Search by Patient Name or PID..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-6 bg-gray-100 px-6 py-4 text-sm font-semibold text-gray-600">
            <div>Patient</div>
            <div>PID</div>
            <div>Total</div>
            <div>Paid</div>
            <div>Pending</div>
            <div>Action</div>
          </div>

          {filteredPatients.map(
            (patient) => (
              <div
                key={patient.pid}
                className="grid grid-cols-6 px-6 py-4 border-t items-center"
              >
                <div className="font-medium">
                  {patient.pname}
                </div>

                <div>{patient.pid}</div>

                <div>
                  ₹{patient.total}
                </div>

                <div className="text-green-600 font-semibold">
                  ₹{patient.paid}
                </div>

                <div>
                  {patient.pending >
                  0 ? (
                    <span className="text-red-600 font-semibold">
                      ₹
                      {
                        patient.pending
                      }
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Cleared
                    </span>
                  )}
                </div>

                <div>
                  <button
                    onClick={() =>
                      navigate(
                        `/billing/${patient.pid}`,
                        {
                          state: patient,
                        }
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    View Details
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
                className="bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="space-y-2">
                  <p>
                    <strong>
                      Patient:
                    </strong>{" "}
                    {patient.pname}
                  </p>

                  <p>
                    <strong>
                      PID:
                    </strong>{" "}
                    {patient.pid}
                  </p>

                  <p>
                    <strong>
                      Total:
                    </strong>{" "}
                    ₹{patient.total}
                  </p>

                  <p className="text-green-600 font-semibold">
                    Paid: ₹
                    {patient.paid}
                  </p>

                  <p
                    className={
                      patient.pending >
                      0
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {patient.pending >
                    0
                      ? `Pending: ₹${patient.pending}`
                      : "Cleared"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/billing/${patient.pid}`,
                      {
                        state: patient,
                      }
                    )
                  }
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                >
                  View Details
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
}