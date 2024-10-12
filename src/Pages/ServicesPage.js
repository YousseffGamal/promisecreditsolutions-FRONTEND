import React, { useEffect } from 'react';
import 'animate.css'; // Import animate.css for animations
import "../app/globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    title: 'Home Buying Consultation',
    description: 'Tailored advice to help you make informed decisions during the home buying process.',
    icon: 'https://via.placeholder.com/80',
  },
  {
    title: 'Real Estate Market Analysis',
    description: 'Comprehensive market insights to guide your property investment decisions.',
    icon: 'https://via.placeholder.com/80',
  },
  {
    title: 'Exclusive Property Listings',
    description: 'Access to exclusive property listings in prime locations.',
    icon: 'https://via.placeholder.com/80',
  },
  {
    title: 'Financing Assistance',
    description: 'Expert advice on financing options to make your home purchase smoother.',
    icon: 'https://via.placeholder.com/80',
  },
  {
    title: 'Professional Home Staging',
    description: 'Enhance your property’s appeal with professional staging services.',
    icon: 'https://via.placeholder.com/80',
  },
];

const ServicesPage = () => {
  useEffect(() => {
    // Import WOW.js only in the browser
    const WOW = require('wowjs').WOW;
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[url('https://via.placeholder.com/1920x600')] bg-cover bg-center h-80 flex justify-center items-center">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="relative text-white text-5xl font-semibold animate__animated animate__fadeIn">Our Services</h1>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 animate__animated animate__fadeIn">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-gray-50 border border-gray-200 rounded-lg shadow-md p-8 hover:shadow-lg hover:border-purple-500 transition duration-300 wow animate__animated animate__fadeInUp"
                data-wow-delay={`${index * 0.1}s`} // Stagger animations
              >
                <div className="flex flex-col items-center">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-16 h-16 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 mt-4">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 animate__animated animate__fadeIn">Why Choose Us?</h2>
          <div className="flex flex-col lg:flex-row justify-around">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 lg:mb-0 lg:w-1/3 wow animate__animated animate__fadeInLeft" data-wow-delay="0.2s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Expert Knowledge</h3>
              <p className="text-gray-600">Benefit from years of real estate experience to guide you through every decision with confidence.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-8 lg:mb-0 lg:w-1/3 wow animate__animated animate__fadeInUp" data-wow-delay="0.3s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalized Solutions</h3>
              <p className="text-gray-600">We listen to your unique needs and provide customized strategies for success in the real estate market.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 lg:w-1/3 wow animate__animated animate__fadeInRight" data-wow-delay="0.4s">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Proven Success</h3>
              <p className="text-gray-600">Our track record of successful transactions is a testament to our commitment to excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-purple-600 py-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-semibold text-white mb-6 animate__animated animate__fadeIn">Let’s Work Together</h2>
          <p className="text-lg text-white mb-8 animate__animated animate__fadeIn">Ready to find your dream home or make your next real estate move? Reach out to us today.</p>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-700 hover:text-white transition-all duration-300 animate__animated animate__fadeIn">
            Contact Us
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ServicesPage;
