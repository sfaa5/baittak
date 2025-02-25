"use client";
import React, { useEffect, useState } from "react";

const Page = () => {

  const [error, setError] = useState(null);

  useEffect(() => {
    const executePayment = async () => {
            // Extract query parameters from URL
            const urlParams = new URLSearchParams(window.location.search);
            const paymentId = urlParams.get("paymentId");
            const token = urlParams.get("token");
            const PayerID = urlParams.get("PayerID");
            const planId = urlParams.get("planId"); 
const userId = urlParams.get("userId");
            if (!paymentId || !token || !PayerID || !planId) {
              setError("Missing payment details in the URL.");
              return;
            }

      try {
        const response = await fetch("http://localhost:5001/api/plans/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
             paymentId,
            PayerID,
            planId,
            userId
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Payment failed");
        }

    
     
      } catch (err) {
        setError(err.message || "An error occurred while processing payment.");
      }
    };

    executePayment();
  }, []);

  return (
<div className="h-screen flex items-center justify-center bg-green-50">
  <div className="bg-white p-10 w-[400px] rounded-lg shadow-lg text-center">
    {/* Success Icon */}
    <div className="flex justify-center items-center mb-6 w-16 h-16 rounded-full bg-green-100 mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7 12l2 2m2 2l4-4m-2-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>


{error?"Payment Failed":<>
    <h1 className="text-2xl font-bold text-green-700 mb-2">Plan Activated!</h1>

 
    <p className="text-gray-600">
      plan has been successfully activated. Enjoy all the benefits of your subscription!
    </p></>}
    

    {/* Button */}
    <button
      className="mt-8 px-6 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 transition duration-300"
      onClick={() => (window.location.href = "/")}
    >
      Go to Home
    </button>
  </div>
</div>


  );
};

export default Page;
