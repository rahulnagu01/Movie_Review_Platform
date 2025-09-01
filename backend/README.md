# Movie Review Platform

## Overview
A full-stack web application for browsing, reviewing, and rating movies.

## Tech Stack
- **Frontend**: React, Redux, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Set environment variables in `.env` (see below)
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## Environment Variables

### Backend
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Documentation

See [backend/src/routes](backend/src/routes) for endpoint details. Example:

- `GET /movies` - List movies (pagination/filter)
- `POST /movies/:id/reviews` - Add review (auth required)
- etc.

## Database Setup

1. Create a MongoDB database (local or cloud).
2. Update `MONGO_URI` in `.env`.

## Additional Notes

- Ensure proper error boundaries in React.
- Use input validation (see backend models).
- Rate limiting can be added with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).

## Design Decisions

- Modular route/controller structure
- JWT for scalable auth
- Redux for complex state (movies, user, reviews)