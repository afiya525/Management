import React, { useState } from "react";
import Layout from "./Layout";

export default function MedicineInventory() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] =
    useState("all");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedMedicine, setSelectedMedicine] =
    useState(null);

  const [medicines, setMedicines] = useState([
    {
      id: "M001",
      name: "Paracetamol",
      scientificName: "Acetaminophen",
      unitCost: 10,
      quantity: 250,
    },
    {
      id: "M002",
      name: "Augmentin",
      scientificName:
        "Amoxicillin + Clavulanic Acid",
      unitCost: 35,
      quantity: 40,
    },
    {
      id: "M003",
      name: "Metformin",
      scientificName:
        "Metformin Hydrochloride",
      unitCost: 15,
      quantity: 20,
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    scientificName: "",
    unitCost: "",
    quantity: "",
  });

  const lowStock = medicines.filter(
    (m) => m.quantity < 50
  );

  const displayedMedicines =
    activeTab === "all"
      ? medicines
      : lowStock;

  const filteredMedicines =
    displayedMedicines.filter(
      (medicine) =>
        medicine.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        medicine.scientificName
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  const handleAddMedicine = () => {
    const newMedicine = {
      id: `M${String(
        medicines.length + 1
      ).padStart(3, "0")}`,
      name: form.name,
      scientificName:
        form.scientificName,
      unitCost: Number(form.unitCost),
      quantity: Number(form.quantity),
    };

    setMedicines([
      ...medicines,
      newMedicine,
    ]);

    setForm({
      name: "",
      scientificName: "",
      unitCost: "",
      quantity: "",
    });

    setShowAddModal(false);
  };

  const openEditModal = (medicine) => {
    setSelectedMedicine(medicine);

    setForm({
      name: medicine.name,
      scientificName:
        medicine.scientificName,
      unitCost: medicine.unitCost,
      quantity: medicine.quantity,
    });

    setShowEditModal(true);
  };

  const handleUpdateMedicine = () => {
    setMedicines(
      medicines.map((medicine) =>
        medicine.id ===
        selectedMedicine.id
          ? {
              ...medicine,
              name: form.name,
              scientificName:
                form.scientificName,
              unitCost: Number(
                form.unitCost
              ),
              quantity: Number(
                form.quantity
              ),
            }
          : medicine
      )
    );

    setShowEditModal(false);
  };

  const handleDeleteMedicine = (id) => {
    if (
      window.confirm(
        "Delete this medicine?"
      )
    ) {
      setMedicines(
        medicines.filter(
          (medicine) =>
            medicine.id !== id
        )
      );
    }
  };

  const handleRestock = (id) => {
    const qty = Number(
      prompt("Enter quantity")
    );

    if (!qty || qty <= 0) return;

    setMedicines(
      medicines.map((medicine) =>
        medicine.id === id
          ? {
              ...medicine,
              quantity:
                medicine.quantity +
                qty,
            }
          : medicine
      )
    );
  };

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={
        setSidebarOpen
      }
    >
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            Medicine Inventory
          </h1>

          <button
            onClick={() =>
              setShowAddModal(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            + Add Medicine
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() =>
              setActiveTab("all")
            }
            className={`px-4 py-2 rounded-xl ${
              activeTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            All Medicines (
            {medicines.length})
          </button>

          <button
            onClick={() =>
              setActiveTab("low")
            }
            className={`px-4 py-2 rounded-xl ${
              activeTab === "low"
                ? "bg-red-600 text-white"
                : "bg-white border"
            }`}
          >
            Low Stock (
            {lowStock.length})
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Scientific Name
                  </th>

                  <th className="p-4 text-left">
                    Cost
                  </th>

                  <th className="p-4 text-left">
                    Quantity
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredMedicines.map(
                  (medicine) => (
                    <tr
                      key={
                        medicine.id
                      }
                      className="border-t"
                    >
                      <td className="p-4">
                        {
                          medicine.name
                        }
                      </td>

                      <td className="p-4">
                        {
                          medicine.scientificName
                        }
                      </td>

                      <td className="p-4">
                        ₹
                        {
                          medicine.unitCost
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`font-medium ${
                            medicine.quantity <
                            50
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          {
                            medicine.quantity
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              handleRestock(
                                medicine.id
                              )
                            }
                            className="px-3 py-2 bg-green-600 text-white rounded-lg"
                          >
                            Restock
                          </button>

                          <button
                            onClick={() =>
                              openEditModal(
                                medicine
                              )
                            }
                            className="px-3 py-2 bg-yellow-500 text-white rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteMedicine(
                                medicine.id
                              )
                            }
                            className="px-3 py-2 bg-red-600 text-white rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {(showAddModal ||
          showEditModal) && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">
                {showAddModal
                  ? "Add Medicine"
                  : "Edit Medicine"}
              </h2>

              <div className="space-y-4">
                <input
                  placeholder="Medicine Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target
                          .value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />

                <input
                  placeholder="Scientific Name"
                  value={
                    form.scientificName
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scientificName:
                        e.target
                          .value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="number"
                  placeholder="Unit Cost"
                  value={
                    form.unitCost
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      unitCost:
                        e.target
                          .value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  value={
                    form.quantity
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      quantity:
                        e.target
                          .value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(
                      false
                    );
                    setShowEditModal(
                      false
                    );
                  }}
                  className="px-4 py-2 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    showAddModal
                      ? handleAddMedicine
                      : handleUpdateMedicine
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl"
                >
                  {showAddModal
                    ? "Add"
                    : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}