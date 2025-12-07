# Food Delivery App

A MERN stack food delivery application with Stripe payment integration.

## Features

- Browse food menu by category
- Shopping cart functionality
- Stripe payment integration
- User authentication
- Order tracking
- Admin panel for managing orders and menu items

## Tech Stack

**Frontend:** React, React Router, Axios, Vite  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Payment:** Stripe  
**Auth:** JWT, Bcrypt

## Setup

### Backend
```bash
cd backend
npm install
```

Create `.env` file:
```
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
```

Run server:
```bash
npm run server
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin Panel
```bash
cd admin
npm install
npm run dev
```

## API Endpoints

**Food:**
- GET `/api/food/list`
- POST `/api/food/add`
- POST `/api/food/remove`

**User:**
- POST `/api/user/register`
- POST `/api/user/login`

**Orders:**
- POST `/api/order/create-checkout-session`
- POST `/api/order/verify-payment`
- GET `/api/order/myorders`
- GET `/api/order/all`
- PATCH `/api/order/:id`

## Testing Stripe

Test card: `4242 4242 4242 4242`

## Notes

- Make sure MongoDB is running
- Backend runs on port 4000
- Frontend runs on port 5173
- Admin panel runs on port 5174

