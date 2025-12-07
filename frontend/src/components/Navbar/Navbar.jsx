import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { getTotalCartAmount, token, setToken, cartItems } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }
  const cartCount = Object.values(cartItems || {}).reduce((s, v) => s + (v || 0), 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [])

  useEffect(() => {
    // Sync active menu tab with visible sections using IntersectionObserver
    const ids = ['home', 'explore-menu', 'app-download', 'footer'];
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // map footer/app-download to logical menu keys
          if (id === 'app-download') setMenu('download');
          else if (id === 'footer') setMenu('contact');
          else if (id === 'explore-menu') setMenu('menu');
          else setMenu(id);
        }
      })
    }, { root: null, threshold: 0.45 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    // map logical ids to actual element ids
    const idMap = {
      home: 'home',
      menu: 'explore-menu',
      download: 'app-download',
      contact: 'footer'
    };
    const targetId = idMap[id] || id;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenu(id);
    } else {
      // fallback to anchor navigation
      window.location.hash = idMap[id] || id;
    }
    setMobileOpen(false);
  }

  return (
    <nav className='navbar' role="navigation" aria-label="Main navigation">
      <Link to="/"><img src={assets.logo} className="logo" /></Link>
      <button className="hamburger" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
        <li className={menu === "home" ? "active" : ""}><a href="#home" onClick={(e) => handleAnchorClick(e, 'home')}>Home</a></li>
        <li className={menu === "menu" ? "active" : ""}><a href="#menu" onClick={(e) => handleAnchorClick(e, 'menu')}>Menu</a></li>
        <li className={menu === "download" ? "active" : ""}><a href="#download" onClick={(e) => handleAnchorClick(e, 'download')}>Mobile App</a></li>
        <li className={menu === "contact" ? "active" : ""}><a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>Contact Us</a></li>
      </ul>

      <div className="navbar-right">
        <button className="icon-btn" aria-label="Search">
          <img src={assets.search_icon} alt="Search" />
        </button>

        <Link to="/cart" onClick={() => navigate('/cart')} className="navbar-search-icon" aria-label="Cart">
          <img src={assets.basket_icon} alt="Cart" />
          {cartCount > 0 && <div className="dot">{cartCount}</div>}
        </Link>
        {!token ? <button onClick={() => setShowLogin(true)} className="signin-btn">Sign in</button> :
          <div className='navbar-profile'>
            <img src={assets.user_icon} alt="User Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p>
              </li>
            </ul>
          </div>
        }
      </div>
    </nav>
  )
}

export default Navbar