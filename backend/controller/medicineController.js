import medicine from "../models/medicine.js";

const DUPLICATE_FIELDS = ["scientificName"];

async function findDuplicateMedicine(data, excludeId = null) {
    const conditions = DUPLICATE_FIELDS
        .filter((field) => data[field] !== undefined && data[field] !== null && data[field] !== "")
        .map((field) => ({ [field]: data[field] }));
    
        if (conditions.length === 0) {
            return null;
        }

    const query = { $or: conditions };

    if (excludeId) {
        query._id = { $ne: excludeId };
    }

    return await medicine.findOne(query);
}

export const createMedicine = async (req, res) => {
    try {
        const { scientificName } = req.body;
        const duplicateMedicine = await findDuplicateMedicine({ scientificName });

        if (duplicateMedicine) {
            return res.status(400).json({ error: "A medicine with the same scientific name already exists." });
        }

        // Proceed with creating the new medicine
        const newMedicine = new medicine(req.body);
        await newMedicine.save();
        res.status(201).json(newMedicine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};