# Disaster Relief Management System - Setup Guide

## ✅ Issues Fixed

### 1. Network Errors (CORS)
- **Problem**: Backend was missing CORS configuration, causing all API requests to fail
- **Solution**: Added CORS middleware to backend with proper configuration
- **File Updated**: `backend/src/index.js`

### 2. Dark/Light Theme Toggle
- **Problem**: Theme toggle wasn't working properly
- **Solution**: 
  - Enhanced ThemeContext with better dark mode handling
  - Added theme initialization script in HTML to prevent flash
  - Improved CSS for dark mode support
- **Files Updated**: 
  - `frontend/src/context/ThemeContext.jsx`
  - `frontend/src/index.css`
  - `frontend/index.html`

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Create `.env` file in backend directory:**
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

   You should see: `🚀 Successfully started the server on PORT: 3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Create `.env` file in frontend directory:**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

## 🔧 Important Notes

### Backend Must Be Running
- The frontend requires the backend to be running on port 3000
- If you see "Network Error", check:
  1. Is the backend server running?
  2. Is MongoDB connected?
  3. Is the backend running on port 3000?

### CORS Configuration
- The backend now allows requests from:
  - `http://localhost:5173` (Vite default)
  - `http://localhost:3000`
  - `http://127.0.0.1:5173`

### Theme Toggle
- Click the 🌙/☀️ button in the navbar to toggle dark/light mode
- Your preference is saved in localStorage
- The theme is applied immediately on page load (no flash)

## 📝 Testing the Fixes

1. **Test Network Connection:**
   - Start both backend and frontend
   - Try to register a donation, volunteer, or resource request
   - You should see success messages instead of network errors

2. **Test Theme Toggle:**
   - Click the theme toggle button in the navbar
   - The entire UI should switch between light and dark modes
   - Refresh the page - your theme preference should persist

## 🐛 Troubleshooting

### Still Getting Network Errors?
1. Check backend is running: `http://localhost:3000/api` should respond
2. Check browser console for detailed error messages
3. Verify MongoDB connection in backend
4. Check CORS configuration matches your frontend URL

### Theme Not Switching?
1. Clear browser cache and localStorage
2. Check browser console for errors
3. Verify TailwindCSS is properly installed
4. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📦 Dependencies

### Backend
- express
- cors (now configured)
- mongoose
- stripe
- dotenv

### Frontend
- react
- react-router-dom
- tailwindcss (v4 with Vite plugin)
- react-leaflet
- axios
- @stripe/react-stripe-js
- react-toastify
- recharts

## ✅ All Fixed!

Both issues have been resolved:
- ✅ Network errors fixed with CORS configuration
- ✅ Theme toggle working with improved dark mode support

Enjoy your fully functional Disaster Relief Management System! 🎉

