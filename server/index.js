require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenAI } = require('@google/genai');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// === Configure Gemini API (NEW SDK) ===
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


// === Route: Upload resume & suggestions ===
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = path.join(uploadDir, req.file.filename);
    const pdfData = await pdfParse(fs.readFileSync(filePath));
    fs.unlinkSync(filePath);

    const text = pdfData.text;
    let suggestions = [];

    try {
      const prompt = `
You are a professional resume reviewer.
Return exactly 5 short, actionable suggestions.
Each <= 12 words, no proper nouns.

Resume:
${text}
`;

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      suggestions = result.text
        .split('\n')
        .filter(Boolean)
        .slice(0, 5);
    } catch (aiError) {
      console.error("Gemini AI Error:", aiError);
    }

    res.json({
      message: 'File uploaded successfully',
      text: text.substring(0, 500) + "...",
      suggestions,
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ message: 'Error processing resume' });
  }
});


// === Route: Compare Resume with JD ===
app.post('/api/compare', upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required" });
    }

    const filePath = path.join(uploadDir, req.file.filename);
    const pdfData = await pdfParse(fs.readFileSync(filePath));
    fs.unlinkSync(filePath);

    const resumeText = pdfData.text;

    const prompt = `
You are an ATS.
Return JSON only.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let json;
    try {
      json = JSON.parse(result.text);
    } catch {
      json = { score: 0, missingKeywords: [] };
    }

    res.json({
      score: json.score || 0,
      missingKeywords: json.missingKeywords || [],
    });

  } catch (error) {
    console.error("Error comparing resume:", error);
    res.status(500).json({ message: "Error comparing resume and job description" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(' Jai bhai Server running on http://localhost:5000');
});
