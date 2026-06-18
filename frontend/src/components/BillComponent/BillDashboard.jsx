import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";

export default function BillDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state || {
  pid: "",
  pname: "",
  total: 0,
  paid: 0,
  pending: 0,
  transactions: [],
};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [transactions, setTransactions] = useState(
  patient?.transactions || []
);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("Cash");

  const handleMarkPaid = (index) => {
    const updated = [...transactions];

    updated[index] = {
      ...updated[index],
      status: "Paid",
      method: paymentMethod,
    };

    setTransactions(updated);
  };

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/bill-payments")}
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Bills & Payments
          </button>

          <span className="text-gray-400">
            &gt;
          </span>

          <span className="font-medium text-gray-900">
            {patient.pname}
          </span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <h3 className="text-gray-500 mb-2">
              Total Amount
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              ₹{patient.total}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <h3 className="text-gray-500 mb-2">
              Paid
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹{patient.paid}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <h3 className="text-gray-500 mb-2">
              Pending / Balance
            </h3>

            <p className="text-3xl font-bold text-red-600">
              ₹{patient.pending}
            </p>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">
              Transactions for {patient.pname}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">
                    Purpose
                  </th>
                  <th className="p-4 text-left">
                    Amount
                  </th>
                  <th className="p-4 text-left">
                    Method
                  </th>
                  <th className="p-4 text-left">
                    Reference
                  </th>
                  <th className="p-4 text-left">
                    Date
                  </th>
                  <th className="p-4 text-left">
                    Status
                  </th>
                  <th className="p-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(
                  (transaction, index) => (
                    <tr
                      key={transaction.id}
                      className="border-t"
                    >
                      <td className="p-4">
                        {
                          transaction.purpose
                        }
                      </td>

                      <td className="p-4">
                        ₹
                        {
                          transaction.amount
                        }
                      </td>

                      <td className="p-4">
                        {
                          transaction.method
                        }
                      </td>

                      <td className="p-4">
                        {
                          transaction.reference
                        }
                      </td>

                      <td className="p-4">
                        {
                          transaction.date
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.status ===
                            "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {
                            transaction.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        {transaction.status ===
                        "Pending" ? (
                          <button
                            onClick={() => {
                              setSelectedTransaction(
                                transaction
                              );
                              setSelectedIndex(
                                index
                              );
                              setShowPaymentModal(
                                true
                              );
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {transactions.map(
            (transaction, index) => (
              <div
                key={transaction.id}
                className="bg-white rounded-2xl shadow-sm p-5"
              >
                <div className="space-y-2">
                  <p>
                    <strong>
                      Purpose:
                    </strong>{" "}
                    {
                      transaction.purpose
                    }
                  </p>

                  <p>
                    <strong>
                      Amount:
                    </strong>{" "}
                    ₹
                    {
                      transaction.amount
                    }
                  </p>

                  <p>
                    <strong>
                      Method:
                    </strong>{" "}
                    {
                      transaction.method
                    }
                  </p>

                  <p>
                    <strong>
                      Reference:
                    </strong>{" "}
                    {
                      transaction.reference
                    }
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {
                      transaction.date
                    }
                  </p>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status ===
                      "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>

                {transaction.status ===
                  "Pending" && (
                  <button
                    onClick={() => {
                      setSelectedTransaction(
                        transaction
                      );
                      setSelectedIndex(
                        index
                      );
                      setShowPaymentModal(
                        true
                      );
                    }}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
                  >
                    Mark Paid
                  </button>
                )}
              </div>
            )
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h3 className="text-xl font-semibold">
                  Mark Payment
                </h3>

                <button
                  onClick={() =>
                    setShowPaymentModal(
                      false
                    )
                  }
                  className="text-gray-500 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-5">
                <div className="flex justify-between">
                  <span>Patient</span>
                  <strong>
                    {patient.pname}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Purpose</span>
                  <strong>
                    {
                      selectedTransaction?.purpose
                    }
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span>Amount</span>
                  <strong>
                    ₹
                    {
                      selectedTransaction?.amount
                    }
                  </strong>
                </div>
              </div>

              <label className="block mb-2 font-medium">
                Payment Method
              </label>

              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-3 mb-6"
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setShowPaymentModal(
                      false
                    )
                  }
                  className="border px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    handleMarkPaid(
                      selectedIndex
                    );
                    setShowPaymentModal(
                      false
                    );
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}