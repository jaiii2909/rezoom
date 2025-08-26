Rezoom - AI Resume Builder and Job Description Matcher

Rezoom is a full-stack web application that helps users optimize their resumes for Applicant Tracking Systems (ATS). It allows users to upload resumes, extract text, get improvement suggestions, and compare resumes against job descriptions to calculate match scores and identify missing keywords.

Features

Resume Upload and Parsing
Upload resumes in PDF, DOC, DOCX, or TXT format and extract text automatically.

ATS Suggestions
Get AI-powered suggestions to improve your resume for better ATS compatibility.

Job Description Comparison
Compare your resume with a given job description to:

Calculate a match score (0–100).

Identify missing skills or keywords.

Match Visualization
Visual representation of the match score using a progress bar.

Tech Stack

Frontend

React (Create React App)

Bootstrap

react-circular-progressbar

Axios

Backend

Node.js

Express

Multer (file uploads)

pdf-parse (resume parsing)

Google Generative AI (Gemini API)

Database

MongoDB (can be extended if storing resumes or user data is required)

Installation and Setup

Clone the repository

git clone https://github.com/your-username/rezoom.git
cd rezoom


Install dependencies

Backend:

cd backend
npm install


Frontend:

cd frontend
npm install


Run the application

Start backend server:

cd backend
node index.js


Start frontend development server:

cd frontend
npm start


By default:

Backend runs on http://localhost:5000

Frontend runs on http://localhost:3000

Environment Variables

For production, create a .env file in the backend to store:

GEMINI_API_KEY=your_api_key_here

Usage

Navigate to the app in your browser at http://localhost:3000.

Upload your resume and extract text.

View AI-powered suggestions to improve it.

Paste a job description and upload your resume to calculate match score and missing keywords.

Project Structure
rezoom/
│
├── backend/               # Express server
│   ├── index.js           # Main server file with APIs
│   ├── uploads/           # Temporary storage for resumes
│   └── package.json
│
├── frontend/              # React client
│   ├── src/
│   │   ├── components/
│   │   │   ├── Upload.js          # Resume upload & suggestions
│   │   │   ├── JobDescription.js  # Resume vs JD comparison
│   │   │   └── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

Future Enhancements

Support for multiple file formats beyond PDF/DOC/DOCX.

User authentication and profile storage.

Resume builder with customizable templates.

Exporting ATS-optimized resumes in different formats.
