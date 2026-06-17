import React from "react";

const PharmacyBill = React.forwardRef(
  ({ patient, medicines }, ref) => {
    const totalAmount = medicines.reduce(
      (sum, item) =>
        sum +
        item.dispensedQty * item.unitCost,
      0
    );

    return (
      <div
        ref={ref}
        className="max-w-6xl mx-auto bg-white p-8 text-gray-900"
      >
        {/* Header */}
        <div className="text-center border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold">
            Clinic Management System
          </h1>

          <p className="text-gray-500 mt-2">
            Pharmacy Bill •{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Patient Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <p>
              <span className="font-semibold">
                Patient Name:
              </span>{" "}
              {patient?.name}
            </p>
          </div>

          <div>
            <p>
              <span className="font-semibold">
                Patient ID:
              </span>{" "}
              {patient?.pid}
            </p>
          </div>
        </div>

        {/* Medicines Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border">
                  Medicine
                </th>

                <th className="p-3 text-left border">
                  Dosage
                </th>

                <th className="p-3 text-left border">
                  Timing
                </th>

                <th className="p-3 text-left border">
                  Days
                </th>

                <th className="p-3 text-left border">
                  Qty
                </th>

                <th className="p-3 text-left border">
                  Unit Cost
                </th>

                <th className="p-3 text-left border">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((item) => (
                <tr
                  key={item.medicineId}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border">
                    {item.medicine}
                  </td>

                  <td className="p-3 border">
                    {item.dosage || "-"}
                  </td>

                  <td className="p-3 border">
                    {item.frequency || "-"}
                  </td>

                  <td className="p-3 border">
                    {item.days || "-"}
                  </td>

                  <td className="p-3 border">
                    {item.dispensedQty}
                  </td>

                  <td className="p-3 border">
                    ₹{item.unitCost}
                  </td>

                  <td className="p-3 border font-medium">
                    ₹
                    {item.dispensedQty *
                      item.unitCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-8 flex justify-end">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-6 py-4">
            <p className="text-lg font-semibold">
              Total Amount: ₹
              {totalAmount}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t pt-6 text-center text-gray-500 text-sm">
          Clinic Management System • Pharmacy Department
        </div>
      </div>
    );
  }
);

export default PharmacyBill;