import Language from "../models/Language.js";

// Create Language
export const createLanguage = async (req, res) => {
  try {
    const { name, code } = req.body;

    const existing = await Language.findOne({ $or: [{ name }] });
    if (existing) {
      return res.status(400).json({ message: "Language already exists" });
    }

    const language = await Language.create({ name });
    res.status(201).json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Languages
export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find().sort({ createdAt: -1 });
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Language
export const getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Language
export const updateLanguage = async (req, res) => {
  try {
    const { name, code } = req.body;
    const language = await Language.findByIdAndUpdate(
      req.params.id,
      { name, code },
      { new: true, runValidators: true }
    );
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Language
export const deleteLanguage = async (req, res) => {
  try {
    const language = await Language.findByIdAndDelete(req.params.id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.json({ message: "Language deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
