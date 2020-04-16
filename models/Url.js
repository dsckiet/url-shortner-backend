const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
	urlCode: String,
	longUrl: String,
	shortUrl: String,
	date: { type: String, default: Date.now },
	clicks: { type: Number, default: 0 },
	title: String,
});

module.exports = mongoose.model("url", urlSchema);
