import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/all`, {
        headers: { token: localStorage.getItem('token') || '' }
      });

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `${url}/api/order/${orderId}`,
        { status: newStatus },
        { headers: { token: localStorage.getItem('token') || '' } }
      );

      if (response.data.success) {
        toast.success('Order status updated');
        fetchAllOrders(); // Refresh orders
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  return (
    <div className='orders'>
      <h2>Order Management</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p className="no-orders">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-icon">
                <img src={assets.parcel_icon} alt="Order" />
              </div>

              <div className="order-details">
                <div className="order-header">
                  <p className="order-id">Order #{order._id.slice(-8)}</p>
                  <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                </div>

                <div className="order-items-list">
                  <p className="items-label">Items:</p>
                  {order.items.map((item, index) => (
                    <span key={index} className="item-name">
                      {item.name} x {item.quantity}
                      {index < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>

                <div className="order-customer">
                  <p><strong>Customer:</strong> {order.address.firstName} {order.address.lastName}</p>
                  <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipCode}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                </div>

                <div className="order-footer">
                  <p className="order-items-count">Items: {order.items.length}</p>
                  <p className="order-amount">${order.Amount.toFixed(2)}</p>
                  <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                    {order.payment ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              </div>

              <div className="order-status-section">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;