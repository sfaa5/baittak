import React from 'react';
import { format } from "date-fns";

interface ModalProps {
  onClose: () => void;
  title: string;
  message: string;
  phone: string;
  time: string;
  email: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, title, message, phone, time, email }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-4">Sender Details</h2>
        <div className="space-y-4">
          <p className="text-gray-600"><strong className="text-gray-800">Name:</strong> {title}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Message:</strong> {message}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Phone:</strong> {phone}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Time:</strong> {format(new Date(time), "MMM dd, hh:mm a")}</p>
          <p className="text-gray-600"><strong className="text-gray-800">Email:</strong> {email}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-secondary to-black-200 text-white rounded-lg font-medium hover:from-secandry-600 hover:to-blue-700 shadow-md transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
