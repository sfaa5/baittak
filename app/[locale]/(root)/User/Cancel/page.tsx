"use client";
import React from 'react';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-4 text-gray-700">
          Your payment process has been canceled. If you wish, you can try again.
        </p>
        {/* <button
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => router.push('/')}
        >
          Go to Home
        </button> */}
      </div>
    </div>
  );
};

export default Page;