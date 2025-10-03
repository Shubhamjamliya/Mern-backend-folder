import State from "../models/State.js";
import Country from "../models/Country.js";

// Get all states (optionally by country)
export const getStates = async (req, res) => {
  try {
    const { countryId } = req.query;
    let query = {};
    if (countryId) query.country = countryId;

    const states = await State.find(query).populate("country", "name");
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: "Error fetching states", error: err.message });
  }
};

// Create state
export const createState = async (req, res) => {
  try {
    const { name, countryId } = req.body;

    const country = await Country.findById(countryId);
    if (!country) return res.status(404).json({ message: "Country not found" });

    const existing = await State.findOne({ name, country: countryId });
    if (existing) {
      return res.status(400).json({ message: "State already exists in this country" });
    }

    const state = await State.create({ name, country: countryId });
    res.status(201).json(state);
  } catch (err) {
    res.status(500).json({ message: "Error creating state", error: err.message });
  }
};

// Update state
export const updateState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, countryId } = req.body;

    const updated = await State.findByIdAndUpdate(
      id,
      { name, country: countryId },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "State not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating state", error: err.message });
  }
};

// Delete state
export const deleteState = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await State.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "State not found" });

    res.json({ message: "State deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting state", error: err.message });
  }
};
