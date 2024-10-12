import React from 'react';
import { FaCamera } from 'react-icons/fa';
import "../app/globals.css";

const PaymentMethodPage = () => {
  return (
    <section className="bg-gray-50 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Payment Method</h1>

        {/* User Profile Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          <div className="flex flex-col md:flex-row mb-4">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="shadow-sm border rounded w-full py-2 px-3"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="shadow-sm border rounded w-full py-2 px-3"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                className="shadow-sm border rounded w-full py-2 px-3"
                placeholder="Your Phone"
                required
              />
            </div>
          </div>

          {/* ID Photo Section */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="id-photo">ID Photo:</label>
            <div className="flex items-center">
              <input
                type="file"
                id="id-photo"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="id-photo"
                className="flex items-center justify-center w-full h-40 border-dashed border-2 border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >
                <FaCamera className="text-gray-400 mr-2" />
                <span className="text-gray-500">Upload ID Photo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Pay Invoice Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Pay Invoice</h2>
          <p className="text-gray-700 mb-4">
            Click the button below to pay your invoice.
          </p>
          <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-300">
            Pay Invoice
          </button>
        </div>

        {/* Book Meeting Section */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Book Meeting</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="meeting-date">Select Date:</label>
              <input
                type="date"
                id="meeting-date"
                className="shadow-sm border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="meeting-time">Select Time:</label>
              <input
                type="time"
                id="meeting-time"
                className="shadow-sm border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="status">Follow-Up Status:</label>
              <select
                id="status"
                className="shadow-sm border rounded w-full py-2 px-3"
                required
              >
                <option value="" disabled selected>Select status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition duration-300">
              Book Meeting
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodPage;
