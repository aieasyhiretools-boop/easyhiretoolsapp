# EasyHire Tools - Job Posting Platform

A comprehensive mobile and web application for job seekers to post resumes and employers to post job requirements.

## Project Structure

```
EasyhiretoolsApp/
├── mobile/          # React Native mobile app
│   ├── src/
│   │   ├── screens/    # All screen components
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API services
│   │   └── navigation/ # Navigation configuration
│   ├── App.tsx         # Main app component
│   └── package.json
└── backend/         # Node.js/Express API server
    ├── routes/        # API routes
    ├── models/        # Database models
    ├── middleware/    # Middleware functions
    ├── server.js      # Main server file
    └── package.json
```

## Features

### For Job Seekers
- 📄 Post and manage resume
- 🔍 Browse job listings
- 💼 Apply for jobs
- 👤 Manage profile

### For Employers
- 📝 Post job requirements
- 👥 View applicants
- 🔍 Search candidates
- 📊 Manage job listings

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

4. Start the server:
```bash
npm run dev
```

The API will be running on `http://localhost:5000`

### Mobile App Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL in `src/services/api.js` if using a different backend address

4. Start the app:
```bash
# For Android
npm run android

# For iOS
npm run ios

# For Web
npm run web

# Or with Expo
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Post new job (employers only)
- `POST /api/jobs/:id/apply` - Apply for a job
- `PUT /api/jobs/:id` - Update job (job poster only)

### Resumes
- `GET /api/resumes` - Get current user's resume
- `GET /api/resumes/user/:userId` - Get user's resume
- `POST /api/resumes` - Create/update resume
- `DELETE /api/resumes` - Delete resume

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Mobile
- React Native
- React Navigation
- Expo
- Axios for API calls
- React Native Vector Icons

## Database Models

### User
- name, email, password, userType (jobseeker/employer)
- phone, avatar, company
- timestamps

### Job
- title, description, company, location
- salary (min, max, currency)
- jobType (full-time, part-time, contract, internship)
- requirements, skills
- postedBy (employer reference)
- applicants (array of user applications)

### Resume
- userId, title, summary
- experience, education, skills
- fileUrl, visibility
- timestamps

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/easyhire
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
