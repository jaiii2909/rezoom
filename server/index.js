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

// === AI Suggestions using Gemini (Structured JSON) ===
let suggestions = [];
try {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an ATS optimization assistant.
Return exactly 5 short, actionable suggestions to improve this resume's ATS score.
Each suggestion must be <= 12 words, no proper nouns.

Resume:
${text}
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }]}],
    generationConfig: {
      // Force strict JSON so the model can't wrap in code fences or prose
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          suggestions: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: { type: "string", maxLength: 80 }
          }
        },
        required: ["suggestions"]
      }
    }
  });

  const json = JSON.parse(result.response.text());
  suggestions = Array.isArray(json.suggestions) ? json.suggestions.slice(0, 5) : [];
} catch (aiError) {
  console.error("Gemini AI Error:", aiError);
  suggestions = [];
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
  console.log(' Jai bhai Server running on http://localhost:5000');
});
