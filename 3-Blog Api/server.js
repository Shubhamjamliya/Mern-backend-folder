import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from "./routes/postRoutes.js"
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

//connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => console.log("server running"));
  })
  .catch(err => console.error(err));

