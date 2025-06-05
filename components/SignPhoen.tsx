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
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Phone Number</h2>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    );
  }
  
  export default SignPhone;
  