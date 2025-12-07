import React from 'react'
import './Header.css'
import header_img from '../../assets/header_img.png'

const Header = () => {
  return (
    <div 
      id="home"
      className='header' 
      style={{ backgroundImage: `url(${header_img})` }}  // ✅ sets image dynamically
    >
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          "Welcome to Khaana Express — your ultimate destination for fresh, fast, and flavorful food delivered right to your doorstep! 
          From local delights to global favorites, we bring restaurant-quality meals to you in minutes. 
          Order now and taste happiness, one bite at a time!"
        </p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
