require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { GoogleGenAI } = require('@google/genai');

const PORT = process.env.PORT || 5000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim());

const app = express();
app.set('trust proxy', 1); // behind Render's proxy; needed for per-IP rate limiting
app.use(cors({ origin: CLIENT_ORIGINS }));
app.use(express.json());
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { message: 'Too many requests, please try again later.' },
}));

// === Configure Gemini API ===
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Multer setup: keep files in memory, never write resumes to disk
const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) return cb(null, true);
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'resume'));
  },
});

// Extract plain text from an uploaded PDF, DOCX or TXT file
async function extractText(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.pdf') return (await pdfParse(file.buffer)).text;
  if (ext === '.docx') return (await mammoth.extractRawText({ buffer: file.buffer })).value;
  return file.buffer.toString('utf8');
}


// === Route: Upload resume & suggestions ===
app.post('/api/upload', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const text = (await extractText(req.file)).trim();
    if (!text) {
      return res.status(400).json({ message: 'Could not read any text from the resume' });
    }

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
        model: GEMINI_MODEL,
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
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const resumeText = (await extractText(req.file)).trim();
    if (!resumeText) {
      return res.status(400).json({ message: 'Could not read any text from the resume' });
    }

    const prompt = `
You are an ATS (Applicant Tracking System).
Compare the resume against the job description.
Respond with JSON only, in exactly this shape:
{"score": <integer 0-100, how well the resume matches the job>, "missingKeywords": [<important skills or keywords from the job description that are missing in the resume>]}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    let json;
    try {
      json = JSON.parse(result.text);
    } catch {
      console.error('Invalid JSON from Gemini:', result.text);
      return res.status(502).json({ message: 'Could not analyze the resume. Please try again.' });
    }

    const score = Math.round(Number(json.score));
    res.json({
      score: Number.isFinite(score) ? Math.min(100, Math.max(0, score)) : 0,
      missingKeywords: Array.isArray(json.missingKeywords)
        ? json.missingKeywords.filter((k) => typeof k === 'string')
        : [],
    });

  } catch (error) {
    console.error("Error comparing resume:", error);
    res.status(500).json({ message: "Error comparing resume and job description" });
  }
});


// Upload errors (file too large / wrong type) -> 400 instead of a crash
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'File is too large (max 5 MB)'
      : 'Only PDF, DOCX or TXT files are allowed';
    return res.status(400).json({ message });
  }
  console.error('Unexpected error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
