const express = require("express");
const app = express();

// connect db;
require("dotenv").config();
require("./config/db");

app.use(express.json({ extended: false }));

// routes
app.use("/api/url", require("./routes/url"));
app.use("/", require("./routes/index"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server running"));
