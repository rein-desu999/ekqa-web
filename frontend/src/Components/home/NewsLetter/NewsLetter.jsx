import React, {useState} from 'react'
import './NewsLetter.css'
import event1_6 from '../../../assets/Event/1/event1_6.jpg'

const NewsLetter =()=>{
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const form = e.target;

        if (form.checkValidity()) {
            alert('Form submitted successfully!');
            form.reset(); // Reset the form after successful submission
            setFormSubmitted(false);
        }
        else{
            alert('Please correct the highlighted field.');
        }
    };

    return (
        <div className='newsletter'>
            <div className="newsletter-left">
                <img src={event1_6} alt="" />
            </div>
            <div className="newsletter-right">
                <h1>Get News On Our Next Events and Recource</h1>
                <p>Subscribe to our newletter and stay updated</p>
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <input type="name" placeholder='Firstname & Lastname' name="name" required className={formSubmitted ? 'validated':''}/>
                    
                        <input type="email" placeholder='Your Email ID' name="email" required className={formSubmitted ? 'validated':''}/>
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;