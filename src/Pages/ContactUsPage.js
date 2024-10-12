import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../app/globals.css";
import 'animate.css'; // Import animate.css for animations

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Import WOW.js only in the browser
    const WOW = require('wowjs').WOW;
    const wow = new WOW();
    wow.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const contactData = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/contact', contactData);
      if (response.status === 200) {
        setSuccessMessage('Message sent successfully!');
        setErrorMessage('');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      setErrorMessage('There was an error sending your message. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[url('https://via.placeholder.com/1920x600')] bg-cover bg-center h-80 flex justify-center items-center wow animate__animated animate__fadeIn">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="relative text-white text-5xl font-semibold">Contact Us</h1>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-50 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Get in Touch</h2>
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-8 lg:mb-0 lg:w-1/3 wow animate__animated animate__fadeInLeft">
              <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Office</h3>
                <p className="text-gray-600">123 Main Street, Cityville, XY 12345</p>
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Email</h3>
                <p className="text-gray-600">contact@yourcompany.com</p>
              </div>
            </div>

            <div className="lg:w-2/3 wow animate__animated animate__fadeInRight">
              <img
                src="https://via.placeholder.com/800x400"
                alt="Office location"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Send Us a Message</h2>
          <form className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)} // Update message state
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              ></textarea>
            </div>
            {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-16 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">Our Location</h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4037843297346!2d-122.41941548468158!3d37.77492977975847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d2b8e2eb%3A0x953fca5940a5bd0!2sCity%20Hall%2C%20San%20Francisco!5e0!3m2!1sen!2sus!4v1631237904945!5m2!1sen!2sus"
              loading="lazy"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUsPage;
