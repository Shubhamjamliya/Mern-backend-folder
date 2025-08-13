const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
const app = express();
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/authRoutes"));

//connect to Database ans start the server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
