import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';

// Load .env early
dotenv.config();


// app config
const app = express();
const port = process.env.PORT || 4000;
app.use('/images', express.static('uploads'));


//middleware
// Parse JSON bodies and also accept requests where client sends JSON as text/plain
// Parse JSON bodies (application/json)
app.use(express.json());
// Parse URL-encoded form bodies (optional, useful for HTML forms)
app.use(express.urlencoded({ extended: true }));
// Also accept text/plain bodies and try to parse them as JSON when possible
app.use(express.text({ type: ['text/plain', 'text/*'] }));
app.use((req, res, next) => {
    if (req.is('text/plain') || (req.headers['content-type'] && req.headers['content-type'].startsWith('text/'))) {
        if (typeof req.body === 'string' && req.body.length > 0) {
            try {
                req.body = JSON.parse(req.body);
            } catch (e) {
                // leave req.body as raw string if it's not JSON
            }
        }
    }
    next();
});
app.use(cors());

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

// DB connection
connectDB()
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('Failed to connect to DB:', err));

app.get('/', (req, res) => {
    res.send('Food Delivery Backend Running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

