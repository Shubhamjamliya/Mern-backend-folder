import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: String,                // store URL/path of the image
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Country", countrySchema);
