import React, { useEffect } from 'react';
import { FaHandshake, FaRoad, FaChartLine } from 'react-icons/fa';
import WOW from 'wowjs';
import 'animate.css'; // Import animate.css for animations

const ServicesSection = () => {
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16" id="services">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 wow animate__animated animate__fadeInUp">
          Our Services
        </h2>
        <p className="text-gray-600 text-xl mb-12 wow animate__animated animate__fadeInUp">
          We are here to guide you on your path to financial success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Service 1: Get A Free Consultation */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 wow animate__animated animate__fadeInUp"
            data-wow-delay="0.1s" // Stagger animation
          >
            <div className="text-6xl text-gradient bg-gradient-to-r from-purple-600 to-pink-500 mb-6 p-4 rounded-full inline-block">
              <FaHandshake />
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Get A Free Consultation</h3>
            <p className="text-gray-600">
              Talk to our experts to get personalized financial advice and make informed decisions.
            </p>
          </div>

          {/* Service 2: Start Your Road To Success Today */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 wow animate__animated animate__fadeInUp"
            data-wow-delay="0.2s" // Stagger animation
          >
            <div className="text-6xl text-gradient bg-gradient-to-r from-purple-600 to-pink-500 mb-6 p-4 rounded-full inline-block">
              <FaRoad />
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Start Your Road To Success Today!</h3>
            <p className="text-gray-600">
              We will help you create a step-by-step plan to achieve your financial goals.
            </p>
          </div>

          {/* Service 3: See Your Mortgage Credit Scores Here */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 wow animate__animated animate__fadeInUp"
            data-wow-delay="0.3s" // Stagger animation
          >
            <div className="text-6xl text-gradient bg-gradient-to-r from-purple-600 to-pink-500 mb-6 p-4 rounded-full inline-block">
              <FaChartLine />
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">See Your Mortgage Credit Scores Here</h3>
            <p className="text-gray-600">
              Check your credit scores and mortgage eligibility with our easy-to-use tool.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
