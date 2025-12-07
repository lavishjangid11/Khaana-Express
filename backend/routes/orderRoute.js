import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, createPaymentSession, verifyPayment } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/placeorder', authMiddleware, placeOrder);
orderRouter.post('/create-checkout-session', authMiddleware, createPaymentSession);
orderRouter.post('/verify-payment', authMiddleware, verifyPayment);
orderRouter.get('/myorders', authMiddleware, getUserOrders);
orderRouter.get('/all', authMiddleware, getAllOrders); // admin use
orderRouter.patch('/:id', authMiddleware, updateOrderStatus);

export default orderRouter;
