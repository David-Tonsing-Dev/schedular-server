require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const insertSeeder = require("./seeder/insertSeeder");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`Connected to Database`);
      insertSeeder();
    })
    .catch((err) => console.log(`Error connecting to database: ERR::${err}`));
});
