
const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are an AI assistant for an e-commerce website." }, { role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chatbot response" });
  }
});

module.exports = router;
    