import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import languageRoutes from "./routes/languageRoutes.js";
import countryRoutes from "./routes/countryRoutes.js"
import stateRoutes from "./routes/stateRoutes.js"
import districtRoutes from "./routes/districtRoutes.js";
import imageuploadRoutes from "./routes/imageuploadRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import searchStudentRoutes from "./routes/searchStudentRoutes.js";
import employeetRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();


// DB Connection
connectDB();

const PORT = process.env.PORT || 5000;

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));


// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/imageuploads", imageuploadRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/searchstudents", searchStudentRoutes);
app.use("/api/employees", employeetRoutes);



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;
