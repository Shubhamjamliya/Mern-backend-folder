import mongoose from "mongoose";

const imageUploadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true }, // use String if you want leading zeros or +91
    image: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("ImageUpload", imageUploadSchema);
