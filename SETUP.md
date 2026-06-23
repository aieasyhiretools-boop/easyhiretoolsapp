# EasyHire Tools - Setup Instructions

## Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Android Studio (for Android development) or Xcode (for iOS)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/easyhire
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
```

Start the backend:
```bash
npm run dev
```

### 2. Mobile App Setup

```bash
cd mobile
npm install
```

If you're using Expo (recommended):
```bash
npm install -g expo-cli
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

Or run directly:
```bash
# Android
npm run android

# iOS  
npm run ios

# Web
npm run web
```

## Key Features Implemented

✅ User Authentication (Register/Login)
✅ User Type Selection (Job Seeker / Employer)
✅ Job Posting (Employers only)
✅ Resume Management (Job Seekers)
✅ Job Browsing & Search
✅ Job Application System
✅ User Profile Management
✅ JWT-based Authentication
✅ MongoDB Database Integration
✅ Responsive Mobile UI
✅ Tab-based Navigation

## File Structure Overview

### Backend
- `server.js` - Express server entry point
- `routes/` - API endpoints (auth, jobs, resumes, users)
- `models/` - MongoDB schemas (User, Job, Resume)
- `middleware/` - JWT authentication middleware

### Mobile
- `App.tsx` - Main app with navigation setup
- `screens/` - All UI screens (7 screens)
- `services/api.js` - API client with Axios
- `package.json` - Dependencies

## Next Steps

1. Configure your MongoDB connection string
2. Set up a secure JWT secret
3. Test the API endpoints using Postman or similar
4. Run the mobile app on your preferred platform
5. Create test accounts to explore features

## Troubleshooting

- **MongoDB connection error**: Ensure MongoDB is running or update the connection string
- **Port 5000 in use**: Change PORT in .env to another port
- **API calls failing**: Check backend is running and API_BASE_URL is correct in `mobile/src/services/api.js`
- **Module not found**: Run `npm install` in both backend and mobile directories

## Additional Configuration

### For Production
1. Update `API_BASE_URL` in mobile app to production backend URL
2. Use environment variables for sensitive data
3. Set `NODE_ENV=production` in backend
4. Enable proper CORS settings
5. Use secure MongoDB Atlas connection

### Firebase Integration (Optional)
To add push notifications, auth, and database:
1. Create Firebase project
2. Install Firebase packages
3. Configure Firebase in both backend and mobile

Enjoy building with EasyHire Tools! 🚀
