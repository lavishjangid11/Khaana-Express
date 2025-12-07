import React, { useContext, useMemo, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlaceOrder = () => {
  const { cartItems = {}, food_list = [], getTotalCartAmount, token, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const itemsInCart = useMemo(() => {
    return food_list.filter(item => (cartItems[item._id] || 0) > 0);
  }, [food_list, cartItems]);

  const subtotal = useMemo(() => {
    return itemsInCart.reduce((sum, item) => sum + item.price * (cartItems[item._id] || 0), 0);
  }, [itemsInCart, cartItems]);

  const deliveryFee = itemsInCart.length > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street ||
      !formData.city || !formData.state || !formData.zipCode || !formData.country || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (itemsInCart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!token) {
      alert('Please login to place an order');
      navigate('/');
      return;
    }

    try {
      // Prepare order data
      const orderItems = itemsInCart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        image: item.image
      }));

      const orderData = {
        items: orderItems,
        amount: total,
        address: formData
      };

      // Create checkout session
      const response = await axios.post(
        `${url}/api/order/create-checkout-session`,
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        // Redirect to Stripe checkout
        window.location.href = response.data.sessionUrl;
      } else {
        alert('Error creating checkout session');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <form className='place-order' onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleInputChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>

          <button type="submit" className='checkout-btn'>PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder