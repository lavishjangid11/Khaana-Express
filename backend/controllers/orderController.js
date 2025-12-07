import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

// Create Stripe checkout session
const createPaymentSession = async (req, res) => {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const userId = req.userId;
		const { items, amount, address } = req.body;

		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ success: false, message: 'No items provided' });
		}
		if (!amount || typeof amount !== 'number') {
			return res.status(400).json({ success: false, message: 'Invalid amount' });
		}

		// Create order first (payment pending)
		const newOrder = new orderModel({
			userId: userId,
			items: items,
			Amount: amount,
			address: address || {},
			payment: false,
			status: 'Food Processing'
		});

		await newOrder.save();

		// Create Stripe line items
		const line_items = items.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.name,
				},
				unit_amount: Math.round(item.price * 100), // Convert to cents
			},
			quantity: item.quantity,
		}));

		// Add delivery fee
		line_items.push({
			price_data: {
				currency: 'usd',
				product_data: {
					name: 'Delivery Fee',
				},
				unit_amount: 200, // $2.00 in cents
			},
			quantity: 1,
		});

		// Create Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: line_items,
			mode: 'payment',
			success_url: `${req.headers.origin || 'http://localhost:5173'}/verify?success=true&orderId=${newOrder._id}`,
			cancel_url: `${req.headers.origin || 'http://localhost:5173'}/verify?success=false&orderId=${newOrder._id}`,
			metadata: {
				orderId: newOrder._id.toString(),
			},
		});

		return res.json({ success: true, sessionUrl: session.url, orderId: newOrder._id });
	} catch (err) {
		console.error('createPaymentSession error', err);
		return res.status(500).json({ success: false, message: 'Error creating payment session' });
	}
};

// Verify payment and update order
const verifyPayment = async (req, res) => {
	try {
		const { orderId, success } = req.body;

		if (success === 'true' || success === true) {
			// Payment successful - update order
			await orderModel.findByIdAndUpdate(orderId, { payment: true });
			return res.json({ success: true, message: 'Payment verified' });
		} else {
			// Payment failed/cancelled - delete order
			await orderModel.findByIdAndDelete(orderId);
			return res.json({ success: false, message: 'Payment cancelled' });
		}
	} catch (err) {
		console.error('verifyPayment error', err);
		return res.status(500).json({ success: false, message: 'Error verifying payment' });
	}
};

// placeOrder: create an order document from frontend request
const placeOrder = async (req, res) => {
	try {
		const userId = req.userId;
		const { items, amount, address, payment } = req.body;
		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ success: false, message: 'No items provided' });
		}
		if (!amount || typeof amount !== 'number') {
			return res.status(400).json({ success: false, message: 'Invalid amount' });
		}

		const newOrder = new orderModel({
			userId: userId,
			items: items,
			Amount: amount,
			address: address || {},
			payment: !!payment,
		});

		await newOrder.save();

		// Clear user's cart data after order
		await userModel.findByIdAndUpdate(userId, { cartData: {} });

		return res.status(201).json({ success: true, order: newOrder });
	} catch (err) {
		console.error('placeOrder error', err);
		return res.status(500).json({ success: false, message: 'Error placing order' });
	}
}

// get orders for authenticated user
const getUserOrders = async (req, res) => {
	try {
		const userId = req.userId;
		const orders = await orderModel.find({ userId }).sort({ date: -1 });
		return res.json({ success: true, data: orders });
	} catch (err) {
		console.error('getUserOrders error', err);
		return res.status(500).json({ success: false, message: 'Error fetching orders' });
	}
}

// get all orders (admin panel)
const getAllOrders = async (req, res) => {
	try {
		const orders = await orderModel.find({}).sort({ date: -1 });
		return res.json({ success: true, data: orders });
	} catch (err) {
		console.error('getAllOrders error', err);
		return res.status(500).json({ success: false, message: 'Error fetching all orders' });
	}
}

// update order status and/or payment flag
const updateOrderStatus = async (req, res) => {
	try {
		const orderId = req.params.id;
		const { status, payment } = req.body;
		const update = {};
		if (status) update.status = status;
		if (typeof payment === 'boolean') update.payment = payment;

		const order = await orderModel.findByIdAndUpdate(orderId, update, { new: true });
		if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
		return res.json({ success: true, order });
	} catch (err) {
		console.error('updateOrderStatus error', err);
		return res.status(500).json({ success: false, message: 'Error updating order' });
	}
}

export { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, createPaymentSession, verifyPayment };