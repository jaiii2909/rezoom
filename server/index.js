require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// === Keywords for ATS scoring ===
const keywords = ["React", "JavaScript", "Node.js", "MongoDB", "HTML", "CSS", "Express", "PHP"];

const app = express();
app.use(cors());
app.use(express.json());

// === Configure Gemini API ===
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// === Route: Upload, parse resume, ATS score, AI suggestions ===
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = path.join(uploadDir, req.file.filename);
    const fileData = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileData);

    // Delete file after parsing
    fs.unlinkSync(filePath);

    const text = pdfData.text;

    // === ATS Scoring ===
    let matched = 0;
    keywords.forEach((kw) => {
      if (text.toLowerCase().includes(kw.toLowerCase())) {
        matched++;
      }
    });
    const atsScore = Math.round((matched / keywords.length) * 100);

    // === AI Suggestions using Gemini ===
   // === AI Suggestions using Gemini ===
let suggestions = "No suggestions generated.";
try {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `
You are an ATS optimization expert.
Analyze the following resume text and output exactly 5 short improvement tips.

RULES:
- Each tip must be 12 words or less.
- Do NOT add any explanation, numbering, or extra text.
- Output ONLY a JSON array of strings. Example:
["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"]

Resume:
${text}
  `;
  const result = await model.generateContent(prompt);
  suggestions = result.response.text().trim();

  // Safety: Keep only first 5 lines if Gemini adds more
  const lines = suggestions.split("\n").filter(line => line.trim() !== "");
  suggestions = lines.slice(0, 5).join("\n");
} catch (aiError) {
  console.error("Gemini AI Error:", aiError);
}


    res.json({
      message: 'File uploaded successfully',
      text: text.substring(0, 500) + "...", // Short preview
      atsScore,
      suggestions
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ message: 'Error processing resume' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
