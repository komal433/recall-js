# Recall – Backend Focused Project

Recall is a backend-focused full-stack project where users can securely store and revisit important concepts, interview notes, and learning points.

The project focuses on real-world backend development concepts such as authentication, protected routes, MongoDB database integration, password hashing, environment variables, centralized error handling, and user-specific CRUD operations.


## Tech Stack
- JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- Postman

## Features

- User registration
- User login
- JWT-based authentication
- Protected profile route
- Password hashing using bcryptjs
- MongoDB Atlas database connection
- Mongoose-based user model
- Environment variable based configuration
- Centralized error handling
- Async error handling utility
- Create recall notes
- View all recall notes of logged-in user
- View a single recall note
- Update recall note
- Delete recall note
- Ownership protection for recall notes
- Clean backend folder structure
- API testing using Postman

## API Documentation

### User APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/users/register` | Register a new user | No |
| POST | `/api/users/login` | Login user and return JWT token | No |
| GET | `/api/users/profile` | Get logged-in user profile data | Yes |

### Recall APIs

| Method | Endpoint | Description | Protected |
|---|---|---|---|
| POST | `/api/recalls` | Create a new recall note | Yes |
| GET | `/api/recalls` | Get all recalls of logged-in user | Yes |
| GET | `/api/recalls/:id` | Get a single recall by ID | Yes |
| PUT | `/api/recalls/:id` | Update a recall by ID | Yes |
| DELETE | `/api/recalls/:id` | Delete a recall by ID | Yes |

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd recall-js
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Create `.env` file

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
```

### 4. Start backend server

```bash
npm run dev
```

Server will run on:

http://localhost:5000
```
## Learning Outcomes

Through this project, I learned:

- How to structure a backend project
- How routes, controllers, models, middleware, utils, and config files work together
- How to create REST APIs using Express.js
- How to connect backend with MongoDB Atlas
- How to create Mongoose schemas and models
- How JWT authentication works
- How protected routes are implemented
- How password hashing works using bcryptjs
- How to use environment variables securely
- How centralized error handling works
- How to build user-specific CRUD APIs
- How ownership checks protect user data
- How to test APIs using Postman
- How to build and commit a project step by step using GitHub


## Development Progress
## Progress Log
- Day 1: Project setup, repository initialization, and backend architecture foundation

## ✅ Day 2 Progress

### Backend Initialization
- Initialized backend using Node.js
- Created `package.json`
- Installed Express.js
- Setup backend entry point

### Project Structure
Created scalable backend folders:
- routes
- controllers
- middleware
- models
- services
- utils

### Learning Focus
- Understanding backend architecture
- Understanding role of routes and controllers
- Understanding client-server separation

## ✅ Day 3 Progress

### Express Server Setup
- Configured Express server
- Added middleware using `express.json()`
- Started backend server on port 5000

### Health Check API
Created first API endpoint:


GET /health





## ✅ Day 4 Progress

### User Authentication APIs
Implemented:
- User Registration API
- User Login API

### Backend Architecture
Connected:
- Routes
- Controllers
- Express Server

### Current APIs

POST /api/users/register
POST /api/users/login


## ✅ Day 5 Progress

### User Model Layer
- Created an in-memory user model
- Added helper functions to create users and find users by email
- Separated data logic from controller logic

### Authentication Validation
- Added duplicate email check during registration
- Added login validation using email and password
- Returned proper success and error responses

### APIs Tested
- Register User
- Login User
- Duplicate registration case

## ✅ Day 6 Progress

### JWT Authentication
- Installed jsonwebtoken package
- Created token generation utility
- Added JWT token in login response

## ✅ Day 8 Progress

### MongoDB Atlas Connection
- Installed Mongoose
- Created database configuration file
- Connected backend server to MongoDB Atlas
- Replaced local MongoDB setup with cloud database connection
- Prepared project for persistent user storage

## ✅ Day 9 Progress

### Mongoose User Model
- Created a real User schema using Mongoose
- Added fields for name, email, and password
- Added timestamps for created and updated user records
- Replaced temporary in-memory user storage with MongoDB storage

### Database-Based Authentication Flow
- Updated register controller to save users in MongoDB
- Updated login controller to find users from MongoDB
- Converted controller functions to async/await
- Used MongoDB `_id` as the user identifier


## ✅ Day 10 Progress

### Password Hashing
- Installed `bcryptjs`
- Added password hashing during user registration
- Stored hashed passwords instead of plain-text passwords
- Added secure password comparison during login

### Authentication Security Improvement
Before Day 10, passwords were stored directly in the database.

## ✅ Day 11 Progress

### Environment Variables Setup
- Installed `dotenv`
- Created `.env` file for sensitive configuration
- Moved MongoDB connection string from code to environment variables
- Moved JWT secret and expiry time to environment variables
- Added `.env` to `.gitignore` to prevent secrets from being pushed to GitHub

## ✅ Day 12 Progress

### Centralized Error Handling
- Created global error middleware
- Added clean JSON error responses
- Improved backend error flow
- Avoided repeated error response logic inside controllers

### Async Handler Utility
- Created reusable `asyncHandler` utility
- Wrapped async controllers to catch errors automatically
- Forwarded async errors to centralized error middleware

## ✅ Day 13 Progress

### Recall Feature Started
- Created Recall model using Mongoose
- Added schema fields for title, content, category, and user
- Connected each recall to the logged-in user
- Created protected APIs for creating and fetching recalls

## ✅ Day 14 Progress

### Complete Recall CRUD
- Added API to get a single recall by ID
- Added API to update a recall
- Added API to delete a recall
- Completed full CRUD functionality for recall note

## ✅ Day 16 Progress

### Frontend Setup
- Setup React frontend using Vite
- Created frontend entry files using `index.html`, `main.jsx`, and `App.jsx`
- Added custom CSS for a modern landing page and authentication UI
- Connected frontend with backend APIs

### Backend CORS Setup
- Installed `cors`
- Enabled CORS in Express backend
- Allowed frontend running on `http://localhost:5173` to call backend APIs


### Pages Added
- Landing page
- Register page
- Login page


## ✅ Day 17 Progress

### Dashboard UI
- Added dashboard page after user login
- Displayed logged-in user information
- Added total recall count on dashboard
- Added logout functionality

### Recall Creation from Frontend
- Added create recall form on the website
- Connected recall form with backend API
- Sent JWT token in request headers for protected recall APIs
- Cleared form after successful recall creation

## ✅ Day 18 Progress

### Resource System Started
- Added a new Resource model for saving learning resources
- Designed resource fields for the upgraded Recall project
- Connected each resource with the logged-in user
- Added support for resource metadata like type, tags, priority, review date, and review count

### Resource Model Fields
- `title`
- `url`
- `description`
- `type`
- `tags`
- `priority`
- `reviewDate`
- `reviewCount`
- `isArchived`
- `user`

### Resource APIs Added
- `POST /api/resources` — save a new learning resource
- `GET /api/resources` — get all saved resources of the logged-in user

### Backend Features Added
- Created `resource.model.js`
- Created `resource.controller.js`
- Created `resource.routes.js`
- Connected resource routes in `index.js`
- Protected resource APIs using JWT authentication
- Ensured users can only access their own saved resources

### Learning Focus
- Understanding how to design a MongoDB model for a real product feature
- Understanding user-specific protected resources
- Understanding how frontend/browser extension features will connect to backend APIs
- Understanding how to structure new backend modules using model, controller, and routes

### Current Status
The Recall project now has a resource-saving backend foundation. Users can save learning resources like articles, videos, coding problems, documentation links, and notes through protected APIs.
Day 18 API Documentation to Add

In your README API section, add:

## Resource APIs

### Save Resource

```http
POST /api/resources

Protected route.

Headers:

Authorization: Bearer <token>
Content-Type: application/json

Request body:

{
  "title": "JWT Authentication Explained",
  "url": "https://example.com/jwt-authentication",
  "description": "Important backend authentication concept for interviews.",
  "type": "article",
  "tags": ["backend", "jwt", "interview"],
  "priority": "high"
}
Get Resources
GET /api/resources

Protected route.

Headers:

Authorization: Bearer <token>

Small warning: because this README block contains code blocks inside code blocks, paste carefully. If VS Code formatting gets confusing, paste only the **Day 18 Progress** section first. API documentation can also be added later in final README.

---

# After commit

After this is done, Day 18 is officially complete.

Then we start:

```text
Day 19: Show saved resources on frontend dashboard

Day 19 will connect the website with:

POST /api/resources
GET /api/resources