import React from 'react'
import './Footer.css'
import logo from '../../../assets/logo/logo.jpg'
import insta from '../../../assets/icons/insta.png'
import linkedin from '../../../assets/icons/linkedin.png'

const Footer =()=>{
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={logo} alt="" />
                <p>EKQA</p>
            </div>
            <ul className="footer-links">
                <li>About</li>
                <li>Support</li>
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
                <p>@ 2026 EKQA. All right reserved</p>
                <p>Empowering Kids With Autism is a 501(c)(3) working to advocate and assist children in the autism spectrum</p>
            </div>
        </div>
    )
}

export default Footer