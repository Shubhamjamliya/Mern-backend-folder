import District from "../models/District.js";
import State from "../models/State.js";
import Country from "../models/Country.js";

// Get all districts (optionally filter by country/state)
export const getDistricts = async (req, res) => {
  try {
    const { countryId, stateId } = req.query;
    let query = {};
    if (countryId) query.country = countryId;
    if (stateId) query.state = stateId;

    const districts = await District.find(query)
      .populate("state", "name")
      .populate("country", "name");

    res.json(districts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching districts", error: err.message });
  }
};

// Create district
export const createDistrict = async (req, res) => {
  try {
    const { name, stateId, countryId } = req.body;

    const country = await Country.findById(countryId);
    if (!country) return res.status(404).json({ message: "Country not found" });

    const state = await State.findById(stateId);
    if (!state) return res.status(404).json({ message: "State not found" });

    const existing = await District.findOne({ name, state: stateId, country: countryId });
    if (existing) {
      return res.status(400).json({ message: "District already exists in this state" });
    }

    const district = await District.create({ name, state: stateId, country: countryId });
    res.status(201).json(district);
  } catch (err) {
    res.status(500).json({ message: "Error creating district", error: err.message });
  }
};

// Update district
export const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, stateId, countryId } = req.body;

    const updated = await District.findByIdAndUpdate(
      id,
      { name, state: stateId, country: countryId },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "District not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating district", error: err.message });
  }
};

// Delete district
export const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await District.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "District not found" });

    res.json({ message: "District deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting district", error: err.message });
  }
};
