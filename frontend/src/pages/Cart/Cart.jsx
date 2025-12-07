import React, {  useContext, useMemo } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems = {}, food_list = [], removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const itemsInCart = useMemo(() => {
    return food_list.filter(item => (cartItems[item._id] || 0) > 0);
  }, [food_list, cartItems]);

  const subtotal = useMemo(() => {
    return itemsInCart.reduce(
      (sum, item) => sum + item.price * (cartItems[item._id] || 0),
      0
    );
  }, [itemsInCart, cartItems]);

  const deliveryFee = itemsInCart.length > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className="cart-items">

        <div className="cart-items-title">
          <p className="col-item">Item</p>
          <p className="col-title">Title</p>
          <p className="col-price">Price</p>
          <p className="col-qty">Quantity</p>
          <p className="col-total">Total</p>
          <p className="col-remove">Remove</p>
        </div>

        {itemsInCart.length === 0 ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          itemsInCart.map(item => (
            <div key={item._id} className="cart-items-row">
              <div className="cart-item-title">
                <img src={item.image} alt={item.name} />
              </div>

              <p className="col-title">{item.name}</p>
              <p className="col-price">${item.price}</p>
              <p className="col-qty">{cartItems[item._id]}</p>
              <p className="col-total">${(item.price * cartItems[item._id]).toFixed(2)}</p>

              <p className='col-remove'>
                <button 
                  className='cross' 
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </p>
            </div>
          ))
        )}
      </div>

      <div className="cart-bottom">
        
        {/* CART TOTAL */}
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

          <button onClick={() => navigate('/order')} className='checkout-btn'>PROCEED TO CHECKOUT</button>
        </div>

        {/* PROMO CODE */}
        <div className="cart-promocode">
          <p>Have a promo code?</p>

          <div className="cart-promocode-input">
            <input type="text" placeholder="Enter promo code" />
            <button>APPLY</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart
