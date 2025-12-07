import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
        <div className='footer' id='footer'>
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className='footer-content-left'>
                        <img src={assets.logo} alt="logo" />
                        <p>Delivering fresh food to your door.</p>
                        <div className="footer-social-icons">
                            <img src={assets.facebook_icon} alt="Facebook" />
                            <img src={assets.twitter_icon} alt="Twitter" />
                            <img src={assets.linkedin_icon} alt="LinkedIn" />
                        </div>
                    </div>

                    <div className='footer-content-center'>
                        <h2>COMPANY</h2>
                        <ul className="footer-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#delivery">Delivery</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className='footer-content-right'>
                        <h2>Get in Touch</h2>
                        <ul className="footer-contact">
                            <li><a href="tel:+99484466996">+99484466996</a></li>
                            <li><a href="mailto:contact@KhaanaExpress.com">contact@KhaanaExpress.com</a></li>
                        </ul>

                        <div className="footer-newsletter">
                            <label htmlFor="newsletter" className="sr-only">Subscribe to our newsletter</label>
                            <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks for subscribing!')}}>
                                <input id="newsletter" className="newsletter-input" placeholder="Your email" type="email" required />
                                <button className="newsletter-btn" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="footer-hr" />

                <div className="footer-bottom">
                    <p className="footer-copyright">© 2024 Khaana Express. All rights reserved.</p>
                    <p className="footer-made">Made with ❤️ • Khaana Express</p>
                </div>
                    <a href="#top" className="back-to-top" aria-label="Back to top">↑</a>
            </div>
        </div>
  )
}

export default Footer