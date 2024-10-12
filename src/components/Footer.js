import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column: Useful Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-purple-400 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-purple-400 transition duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-purple-400 transition duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-purple-400 transition duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Middle Column: Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <p className="mb-2">Email: info@example.com</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p>Address: 123 Street, City, Country</p>
          </div>

          {/* Right Column: Social Media Icons */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FaFacebookF className="text-2xl hover:text-purple-400" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FaTwitter className="text-2xl hover:text-purple-400" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FaInstagram className="text-2xl hover:text-purple-400" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FaLinkedinIn className="text-2xl hover:text-purple-400" />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                <FaGithub className="text-2xl hover:text-purple-400" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
