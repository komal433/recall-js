# Recall – Backend Focused Project

## Project Overview

Recall is a full-stack learning resource manager that helps users save, organize, and review important learning resources.

Users can save articles, videos, coding problems, documentation links, and notes. The project includes authentication, resource management, filtering, spaced review scheduling, Today's Recall, and a Chrome extension for quick-saving webpages.

The main focus of this project is backend architecture, protected APIs, MongoDB data modeling, review scheduling logic, and browser extension integration.


## Tech Stack

- JavaScript
- React
- Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- Chrome Extension Manifest V3
- Postman
- Git and GitHub


## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcryptjs
- Protected backend routes
- MongoDB Atlas database integration
- Save learning resources
- View saved resources
- Filter resources by type, priority, and tag
- Edit and delete/archive resources
- Spaced review scheduling
- Today's Recall page
- Mark resources as reviewed
- Chrome extension quick-save
- User-specific resource ownership
- Centralized error handling

## Architecture

```text
React Frontend
     |
     |  HTTP requests with JWT
     v
Express Backend
     |
     |  Mongoose
     v
MongoDB Atlas


Chrome Extension
     |
     |  Quick-save request with JWT
     v
Express Backend
     |
     |  Mongoose
     v
MongoDB Atlas
```

## API Documentation

### User APIs

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile`

### Resource APIs

- `POST /api/resources`
- `GET /api/resources`
- `GET /api/resources/today`
- `PUT /api/resources/:id`
- `PATCH /api/resources/:id/review`
- `DELETE /api/resources/:id`

## Chrome Extension

Recall includes a Chrome extension for quick-saving learning resources from any webpage.

The extension can:

- Read the current webpage title
- Read the current webpage URL
- Accept description, tags, type, and priority
- Save the resource to the backend using JWT authentication
- Show the saved resource on the Recall dashboard

## Setup

Backend runs from the `server` folder and frontend runs from the `client` folder.

Required environment variables are stored in `server/.env`.

The Chrome extension can be loaded from the `extension` folder using Chrome Developer Mode.


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

## ✅ Day 19 Progress

### Resource Frontend Dashboard
- Connected the React frontend with the new Resource APIs
- Added a resource creation form on the dashboard
- Allowed users to save learning resources directly from the website
- Fetched saved resources from MongoDB and displayed them on the dashboard

## ✅ Day 20 Progress

- Added filters for resources by type, priority, and tag
- Added edit resource functionality
- Added delete/archive resource functionality
- Updated dashboard UI with filter controls and edit/delete buttons
- Added backend APIs for updating and deleting resources
- Used soft delete with `isArchived: true`

## ✅ Day 21 Progress

- Added spaced review scheduling logic
- Added `lastReviewedAt` field in Resource model
- Added Today's Recall backend API
- Added Mark as Reviewed backend API
- Review count now increases after marking a resource as reviewed
- Next review date is automatically scheduled based on review count

## ✅ Day 22 Progress

- Added Today's Recall tab on the dashboard
- Connected frontend with `GET /api/resources/today`
- Added Mark Reviewed button for due resources
- Connected frontend with `PATCH /api/resources/:id/review`
- Updated dashboard stats to show resources due today
- After review, resource is moved to a future review date

## ✅ Day 23 Progress

- Created Chrome extension folder for Recall Quick Save
- Added extension manifest file
- Built popup UI for saving current webpage as a resource
- Captured current tab title and URL automatically
- Added fields for description, type, tags, and priority
- Added temporary save message before backend connection

## ✅ Day 24 Progress

- Connected Chrome extension with backend API
- Added JWT token input in extension popup
- Saved JWT token inside extension localStorage
- Extension now sends saved resource data to backend
- Connected extension with `POST /api/resources`
- Verified that resources saved from extension appear in MongoDB and dashboard