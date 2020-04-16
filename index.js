const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect db;
connectDB();

app.use(express.json({ extended: false }));

// routes

app.use("/api/url", require("./routes/url"));
app.use("/", require("./routes/index"));

app.get("/", (req, res) => {
	res.json("hey");
});

const PORT = 3000;

app.listen(PORT, () => console.log("Server running"));
