const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("short-id");
const config = require("config");

const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post("/shorten", async (req, res) => {
	const { longUrl, customCode, title } = req.body;
	const baseUrl = config.get("baseUrl");

	// check base url
	if (!validUrl.isUri(baseUrl)) {
		return res.status(401).json("invalid base url");
	}

	let urlCode;

	if (customCode) {
		let url = await Url.findOne({ urlCode: customCode });
		if (url) {
			return res.status(401).json("short url exists");
		} else {
			urlCode = customCode;
		}
	} else {
		urlCode = shortid.generate();
	}

	// check long url
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });
			if (url) {
				res.json(url);
			} else {
				const shortUrl = baseUrl + "/" + urlCode;
				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					title,
				});
				await url.save();
				res.json(url);
			}
		} catch (err) {
			console.error(err);
			res.status(500).json("server error");
		}
	} else {
		res.status(401).json("Invalid long url");
	}
});

router.get("/", async (req, res) => {
	try {
		const urls = await Url.find({});
		res.json(urls);
	} catch (err) {
		console.error(err);
		res.status(500).json("server error");
	}
});

module.exports = router;
