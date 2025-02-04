import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './ReservationPopup.css'
const ReservationPopup =({showPopup,setPopup,restaurantDetails })=>{
    const [formData, setFormDate]=useState({
            customerName:'',
            customerEmail:'',
            phoneNumber:'',
            numberOfGusts:'',
            numberOfTables:'',
            reservationDate:'',
            reservationTime:'',
            resturantName:restaurantDetails ? restaurantDetails.restaurantName : '',
            amount:'',
        

    });
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormDate({...formData,[name]:value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data:', formData);  // Log the form data for debugging
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:3000/api/reservation/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const paypalOrderId = res.data.paypalOrderId;
            window.open(`https://www.sandbox.paypal.com/checkoutnow?token=${paypalOrderId}`, '_blank');
        } catch (error) {
            if (error.res) {
                console.error('Error response:', error.res.data);
            } else {
                console.error('Error message:', error.message);
            }
        }
        
    };

return(
<>
{showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Reservation Form</h2>
                        <form className="reservation" onSubmit={handleSubmit}>
                            <label className="si-label">Customer Name</label>
                            <input type="text" name="customerName" required placeholder="Your Name" value={formData.customerName} onChange={handleChange} />
                            <label className="si-label">Email</label>
                            <input type="email" name="customerEmail" required placeholder="aaa@gmail.com" value={formData.customerEmail} onChange={handleChange} />
                            <label className="si-label">Phone Number</label>
                            <input type="tel" name="phoneNumber" pattern="^01[0-9]{9}$" required placeholder="01#########" value={formData.phoneNumber} onChange={handleChange} />
                            <label className="si-label">Number Of Guests</label>
                            <input type="number" name="numberOfGusts" required value={formData.numberOfGusts} onChange={handleChange} />
                            <label className="si-label">Number Of Tables</label>
                            <input type="number" name="numberOfTables" required value={formData.numberOfTables} onChange={handleChange} />
                            <label className="si-label">Reservation Date</label>
                            <input type="date" name="reservationDate" required value={formData.reservationDate} onChange={handleChange} />
                            <label className="si-label">Reservation Time</label>
                            <input type="time" name="reservationTime" required value={formData.reservationTime} onChange={handleChange} />
                            <label className="si-label">Restaurant Name</label>
                            <input type="text" name="resturantName" required value={formData.resturantName} readOnly />
                            <label className="si-label">Amount</label>
                            <input type="number" name="amount" required value={formData.amount} onChange={handleChange} />
                            <button className="book-btn2" type="submit" >Book</button>
                        </form>
                        <button className="close-btn" onClick={() => setPopup(false)}> <FontAwesomeIcon icon={faClose}/> </button>
                    </div>
                </div>
            )}
</>
);
}


export default ReservationPopup;