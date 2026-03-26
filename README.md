# Job Portal - MERN Stack Application

[[Live Demo]()]

A simple and beginner-friendly Job Portal application built with React, Express, MongoDB, and Node.js. This project allows users to view job listings, save favorite jobs, and manage job postings.

**Created by: Mani Mishra**

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## Features

- ✅ View all job listings with full details
- ✅ Search and filter jobs by keywords
- ✅ Save favorite jobs to localStorage
- ✅ Create new job postings
- ✅ Update existing job listings
- ✅ Delete job postings
- ✅ Toggle favorite status for jobs
- ✅ Responsive design for mobile and desktop
- ✅ Clean and professional user interface
- ✅ Beginner-friendly code structure
- ✅ Auto-seeding database with 10 pre-configured jobs
- ✅ Refresh jobs data button to reload latest listings

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **React Router** - Client-side routing

---

## Project Structure

```
JOB PORTAL BACKEND/
│
├── server.js                    # Main Express server
├── package.json                 # Node dependencies
├── .env                         # Environment variables (not in git)
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
│
├── config/
│   └── db.js                    # MongoDB connection setup
│
├── model/
│   └── Jobs.js                  # Job schema and model
│
├── Routes/
│   └── jobs.js                  # Job API routes
│
├── seed.js                      # Database seeding script
│
├── FRONTEND/                    # React frontend
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   │
│   ├── public/
│   │   └── index.html
│   │
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main app component
│       │
│       ├── services/
│       │   └── jobAPI.js        # API service methods
│       │
│       └── components/
│           ├── JobCard.jsx      # Job card component
│           ├── JobCard.css      # Job card styles
│           ├── CreateJobForm.jsx # Create job form
│           ├── Navbar.jsx       # Navigation bar
│           │
│           └── pages/
│               ├── AllJobs.jsx  # All jobs page
│               ├── AllJobs.css  # All jobs styles
│               ├── FavoriteJobs.jsx  # Saved jobs page
│               └── Navbar.jsx   # Navigation component
│
└── README.md                    # This file
```

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- A code editor (VS Code recommended)

To verify installations:
```bash
node --version
npm --version
mongod --version
git --version
```

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manikant0931/job-portal.git
cd "JOB PORTAL BACKEND"
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd FRONTEND
npm install
cd ..
```

---

## Configuration

### Backend Setup

1. Create a `.env` file in the root directory:

```
MONGO_URI=mongodb://localhost:27017/jobportal
PORT=5000
```

2. Make sure MongoDB is running:
   - Windows: Open Command Prompt and run `mongod`
   - Mac: Run `brew services start mongodb-community`
   - Linux: Run `sudo systemctl start mongod`

### Frontend Setup

1. Create a `.env` file in the FRONTEND directory:

```
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Terminal 1 - Start Backend

```bash
cd "JOB PORTAL BACKEND"
node server.js
```

Backend will run on: `http://localhost:5000`

### Terminal 2 - Start Frontend

```bash
cd "JOB PORTAL BACKEND\FRONTEND"
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## Populating Database with Sample Data

Run the seed script to add sample jobs:

```bash
node seed.js
```

This will add 6 sample job listings to your database.

---

## API Endpoints

### Base URL: `http://localhost:5000/api/jobs`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all jobs |
| GET | `/:id` | Get single job by ID |
| POST | `/` | Create new job |
| PUT | `/:id` | Update job |
| DELETE | `/:id` | Delete job |
| PUT | `/:id/favorite` | Toggle favorite |

---

## Usage Guide

### Viewing Jobs

1. Open `http://localhost:5173`
2. View all job listings in grid format
3. Each card shows job details and action buttons

### Saving Jobs

1. Click "Save Job" button on any job card
2. Button changes to "Saved"
3. Job is now in your favorites

### Viewing Saved Jobs

1. Click "Saved Jobs" in navigation
2. View only your favorite jobs

### Creating a New Job

1. Use the job creation form
2. Fill in all job details
3. Click Submit

### Deleting a Job

1. Click "Delete" button on job card
2. Confirm deletion
3. Job is removed

---

## Troubleshooting

### Cannot connect to MongoDB

- Make sure MongoDB is running (`mongod`)
- Check MONGO_URI in `.env`
- Verify MongoDB is installed correctly

### Frontend cannot connect to backend

- Verify backend is running on port 5000
- Check VITE_API_URL in `FRONTEND/.env`
- Check CORS settings in `server.js`

### Jobs not displaying

- Run `node seed.js` to add sample data
- Check MongoDB connection
- Verify API with: `curl http://localhost:5000/api/jobs`

### Ports already in use

```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---


**Repository:** [github.com/MANIMISHRA/job-portal-mern](https://github.com/MANIMISHRA/job-portal-mern)

- ✅ Frontend deployed on Render as Static Site
- ✅ Backend deployed on Render as Web Service
- ✅ Database connected to MongoDB Atlas
- ✅ 10 sample jobs ready to use
- ✅ All features fully functional

### Deployment

For complete, step-by-step deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

#### Quick Summary (30-40 minutes):

1. **Push to GitHub** - Create repository at [github.com/MANIMISHRA/job-portal-mern](https://github.com/MANIMISHRA/job-portal-mern)
2. **Setup MongoDB Atlas** - Create free cluster and get connection string
3. **Deploy Backend on Render** - Web Service with Node environment
4. **Deploy Frontend on Render** - Static Site with React build
5. **Update README** - Add live demo badge
6. **Test & Share** - Verify all features work, share with recruiters!

#### Detailed Guides:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete 7-step guide with troubleshooting
- [RENDER_CHECKLIST.md](RENDER_CHECKLIST.md) - Pre-deployment checklist and settings
- [BADGE_GUIDE.md](BADGE_GUIDE.md) - Customize README badge
- [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) - Verification checklist

#### For Local Development:
```bash
# Backend
npm install
npm start
# Backend runs on http://localhost:5000

# Frontend (in separate terminal)
cd FRONTEND
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push
5. Open a Pull Request

---

## License

This project is open source under the MIT License.

---

## Support

If this project helped you, please:

- Give it a STAR on GitHub
- Share it with friends
- Contribute improvements
- Report bugs

**Your support motivates us to create better learning resources!**

---

## About the Author

**Mani Mishra**

A passionate developer creating beginner-friendly learning projects.

---

## Copyright

Copyright (c) 2024 Mani Mishra. All rights reserved.

This project is provided for educational purposes.

---

## Changelog

### Version 1.0.0
- Initial release
- 6 RESTful API endpoints
- Job listing functionality
- Favorite jobs feature
- Professional UI
- Beginner-friendly code

---

**If you love this project, please give it a STAR! It helps others discover it.**

Happy Learning! 

*Created with passion for learning*
