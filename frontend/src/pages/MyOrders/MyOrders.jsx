import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/myorders`, {
                headers: { token }
            });

            if (response.data.success) {
                setOrders(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (loading) {
        return <div className="my-orders"><p>Loading orders...</p></div>;
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="orders-container">
                {orders.length === 0 ? (
                    <p className="no-orders">You haven't placed any orders yet.</p>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <p className="order-id">Order #{order._id.slice(-8)}</p>
                                    <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className={`order-status ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items:</h4>
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        <div className="item-details">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-quantity">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="order-address">
                                <h4>Delivery Address:</h4>
                                <p>{order.address.firstName} {order.address.lastName}</p>
                                <p>{order.address.street}</p>
                                <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                                <p>{order.address.country}</p>
                                <p>Phone: {order.address.phone}</p>
                            </div>

                            <div className="order-footer">
                                <div className="order-payment">
                                    <span className={order.payment ? 'paid' : 'unpaid'}>
                                        {order.payment ? '✓ Paid' : '✗ Unpaid'}
                                    </span>
                                </div>
                                <div className="order-total">
                                    <strong>Total: ${order.Amount.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
