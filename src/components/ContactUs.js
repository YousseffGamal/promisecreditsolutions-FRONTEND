import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      if (response.status === 200) {
        setSuccessMessage('Message sent successfully');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      }
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="bg-gray-100 py-20" id="contact-us">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-8">Get in Touch</h2>
        <p className="text-gray-700 text-lg text-center mb-12">
          We’d love to hear from you! Fill out the form below or connect with us on social media.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-10 transition-transform transform hover:shadow-2xl">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded transition duration-300"
              >
                Send Message
              </button>
              {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
              {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
            </form>
          </div>

          {/* Right Column: Text and Social Media Icons */}
          <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col justify-between transition-transform transform hover:shadow-2xl">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">Connect with Us</h3>
              <p className="text-gray-600 mb-4">
                If you have any questions or need assistance, feel free to reach out. We are here to help!
              </p>
              <p className="text-gray-600 mb-6">
                Follow us on social media for updates and news.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-6 mt-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-purple-600 rounded-full hover:shadow-lg transition-shadow duration-300">
                  <FaFacebookF className="text-white text-2xl" />
                </div>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-purple-600 rounded-full hover:shadow-lg transition-shadow duration-300">
                  <FaTwitter className="text-white text-2xl" />
                </div>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-purple-600 rounded-full hover:shadow-lg transition-shadow duration-300">
                  <FaInstagram className="text-white text-2xl" />
                </div>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-purple-600 rounded-full hover:shadow-lg transition-shadow duration-300">
                  <FaLinkedinIn className="text-white text-2xl" />
                </div>
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-purple-600 rounded-full hover:shadow-lg transition-shadow duration-300">
                  <FaGithub className="text-white text-2xl" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
