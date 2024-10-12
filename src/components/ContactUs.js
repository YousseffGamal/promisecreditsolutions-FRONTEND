import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const ContactUs = () => {
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
            <form>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
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
