import React, { useState } from "react";
import Layout from "./Layout";


export default function MedicineInventory() {
  const [searchTerm, setSearchTerm] = useState("");

  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      scientificName: "Acetaminophen",
      unitCost: 10,
      quantity: 200,
    },
    {
      id: 2,
      name: "Atorvastatin",
      scientificName: "Atorvastatin Calcium",
      unitCost: 35,
      quantity: 45,
    },
    {
      id: 3,
      name: "Amoxicillin",
      scientificName: "Amoxicillin Trihydrate",
      unitCost: 25,
      quantity: 30,
    },
  ];

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      medicine.scientificName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Medicine Inventory
          </h1>

          <p className="mt-2 text-gray-500">
            Total Medicines: {filteredMedicines.length}
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-6 py-4 font-semibold">
                  Medicine Name
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Scientific Name
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Unit Cost
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Available Quantity
                </th>

                <th className="text-left px-6 py-4 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="border-b"
                  >
                    <td className="px-6 py-4 font-medium">
                      {medicine.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {medicine.scientificName}
                    </td>

                    <td className="px-6 py-4">
                      ₹{medicine.unitCost}
                    </td>

                    <td className="px-6 py-4">
                      {medicine.quantity}
                    </td>

                    <td className="px-6 py-4">
                      {medicine.quantity < 50 ? (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                          Low Stock
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-xl shadow-sm p-4"
              >
                <h3 className="font-semibold text-lg">
                  {medicine.name}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  {medicine.scientificName}
                </p>

                <div className="space-y-2">
                  <p>
                    <strong>Unit Cost:</strong> ₹
                    {medicine.unitCost}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {medicine.quantity}
                  </p>

                  {medicine.quantity < 50 ? (
                    <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                      Low Stock
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                      In Stock
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              No medicines found
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}