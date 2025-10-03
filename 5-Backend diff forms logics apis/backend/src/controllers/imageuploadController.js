import ImageUpload from "../models/ImageUpload.js";

// Add new costomer
export const createImageUpload = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    let imagePath = "";

    if (req.file) {
      imagePath = req.file.filename; // ✅ corrected
    }

    const imageupload = new ImageUpload({ name, email, mobile, image: imagePath });
    await imageupload.save();

    res.status(201).json(imageupload);
  } catch (error) {
    res.status(500).json({ message: "Error creating imageupload", error });
  }
};


// ✅ Get all customers
export const getImageUpload = async (req, res) => {
  try {
    const imageupload = await ImageUpload.find();
    res.json(imageupload);
  } catch (error) {
    res.status(500).json({ message: "Error fetching imageupload", error });
  }
};


// ✅ Update country
export const updateImageUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile } = req.body;

    // Include all fields in updateData
    let updateData = { name, email, mobile };

    if (req.file) {
      updateData.image = req.file.filename; // store only filename
    }

    const imageupload = await ImageUpload.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(imageupload);
  } catch (error) {
    res.status(500).json({ message: "Error updating imageupload", error });
  }
};

// ✅ Delete country
export const deleteImageUpload = async (req, res) => {
  try {
    const { id } = req.params;
    await ImageUpload.findByIdAndDelete(id);
    res.json({ message: "ImageUpload deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ImageUpload", error });
  }
};
