const express = require("express");

const router = express.Router();

const translateText = require("../services/geminiTranslator");

router.post("/", async (req, res) => {
  try {
    const { text, language } = req.body;

    if (!text || !language) {
      return res.status(400).json({
        success: false,

        message: "Text and language are required",
      });
    }

    const translation = await translateText(text, language);

    res.json({
      success: true,

      translation,
    });
  } catch (error) {
    console.log("Translation Route Error:", error.message);

    res.status(500).json({
      success: false,

      message: "Translation failed",
    });
  }
});

module.exports = router;
