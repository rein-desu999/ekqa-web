import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.jpg'
import insta from '../Assets/insta.png'
import linkedin from '../Assets/linkedin.png'

const Footer =()=>{
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={logo} alt="" />
                <p>EKQA</p>
            </div>
            <ul className="footer-links">
                <li>About</li>
                <li>Product</li>
                <li>Resource</li>
                <li>Quick Link</li>
                <li>Contact</li>
            </ul>
            <div className="footer-socials-icon">
                <div className="footer-icons-container">
                    <img src={insta} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={linkedin} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>@ 2024 EKQA.</p>
                <p>Code by Hoanh Lam</p>
            </div>
        </div>
    )
}

export default Footer