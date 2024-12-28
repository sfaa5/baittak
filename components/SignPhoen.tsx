import { useState } from "react";


function SignPhone({ onComplete, isOpen }) {
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handleSubmit = () => {
      if (phoneNumber.trim()) {
        onComplete(phoneNumber); // Notify parent about the update
      } else {
        alert("Please enter a valid phone number");
      }
    };
  
    if (!isOpen) return null; 
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Enter Your Phone Number</h2>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
  
  export default SignPhone;
  