const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { faqDataKH } = require("./promptKH");
const { faqDataEN } = require("./promptENG");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ensure log directory exists
const logDir = path.join(__dirname, "chat-logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const logFilePath = path.join(logDir, "user-logs.txt");

// Append logs to file
function appendChatLog(userMessage, botReply) {
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" });
  const logEntry = `\n[${timestamp}]\nUser: ${userMessage}\nMAZ-BRAIN: ${botReply}\n`;
  fs.appendFile(logFilePath, logEntry, err => {
    if (err) console.error("❌ Error writing chat log:", err);
  });
}

// Match question
function matchQuestion(input, lang) {
  const dataSet = lang === "en" ? faqDataEN : faqDataKH;
  const lowerInput = input.toLowerCase();
  for (const item of dataSet) {
    if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
      return item.answer;
    }
  }
  return lang === "en"
    ? "Sorry! I don't understand. Please rephrase."
    : "សុំអភ័យទោស! ខ្ញុំមិនយល់សំណួរនេះទេ។ សូមសួរឡើងវិញឬប្តូរប្រយោគ។";
}

// Handle chat
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const lang = req.body.lang || "kh";

  const reply = matchQuestion(userMessage, lang);
  appendChatLog(userMessage, reply);

  setTimeout(() => {
    res.json({ reply });
  }, Math.floor(Math.random() * 1000) + 1000);
});

const PORT = process.env.PORT || 25578;
app.listen(PORT, () => {
  console.log(`MAZ-BRAIN running on port ${PORT}`);
});
