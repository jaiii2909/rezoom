// Backend base URL. Override with REACT_APP_API_URL in a .env file.
export const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://rezoom-1.onrender.com");
