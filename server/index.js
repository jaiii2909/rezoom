require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const PORT = process.env.PORT || 5000;
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

// === Route: Upload, parse resume, give suggestions ===
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    const filePath = path.join(uploadDir, req.file.filename);
    const fileData = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileData);

    // Delete file after parsing
    fs.unlinkSync(filePath);

    const text = pdfData.text;

    // === AI Suggestions (Structure, Spacing, Content) ===
    let suggestions = [];
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are a professional resume reviewer.
Return exactly 5 short, actionable suggestions to improve resume readability, structure, spacing, and content clarity.
Each suggestion must be <= 12 words, no proper nouns.

Resume:
${text}
`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }]}],
        generationConfig: {
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
      suggestions
    });

  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ message: 'Error processing resume' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(' Jai bhai Server running on http://localhost:5000');
});
