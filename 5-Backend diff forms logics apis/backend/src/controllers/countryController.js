import Country from "../models/Country.js";

// Add new country
export const createCountry = async (req, res) => {
  try {
    const { name } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = req.file.filename; // store only filename
    }

    const country = new Country({ name, image: imagePath });
    await country.save();

    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ message: "Error creating country", error });
  }
};

// Get all countries
export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries", error });
  }
};

// Update country
export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let updateData = { name };
    if (req.file) {
      updateData.image = req.file.filename; // store only filename
    }

    const country = await Country.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(country);
  } catch (error) {
    res.status(500).json({ message: "Error updating country", error });
  }
};

// Delete country
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.findByIdAndDelete(id);
    res.json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting country", error });
  }
};
