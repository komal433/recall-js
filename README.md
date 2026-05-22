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


