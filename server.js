const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");
const expenseRoutes = require("./Routes/expenseRoutes");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "https://smart-expenses123.netlify.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], // allow needed methods
  allowedHeaders: ["Content-Type", "Authorization"] // allow JWT/auth headers
}));



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.log(err));


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));