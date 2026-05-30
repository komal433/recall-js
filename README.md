# Recall – Backend Focused Project

Recall is a full-stack application designed to store and retrieve user-specific information efficiently.

## Project Goals
- Strong backend architecture
- Clean separation of concerns
- Secure authentication
- Scalable recall item management

## Tech Stack
- JavaScript
- Node.js
- Express
- Frontend: JavaScript (Client layer)

## Architecture
- Client and Server separated
- Layered backend structure (routes, controllers, services, models)
- Centralized error handling (planned)

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