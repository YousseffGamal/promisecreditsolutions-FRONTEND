import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../app/globals.css";
import 'animate.css'; // Import animate.css for animations

const teamMembers = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://via.placeholder.com/400x400',
    description: 'With over two decades of industry experience, John has a deep understanding of real estate trends and client needs. His leadership has positioned the company as a trusted partner for home buyers.',
  },
  {
    name: 'Jane Smith',
    role: 'Chief Marketing Officer',
    image: 'https://via.placeholder.com/400x400',
    description: 'Jane brings a strategic approach to marketing, ensuring our message reaches those seeking expert guidance in their home buying journey. Her creativity and vision drive our marketing success.',
  },
  {
    name: 'Emily Carter',
    role: 'Chief Operations Officer',
    image: 'https://via.placeholder.com/400x400',
    description: 'Emily oversees the day-to-day operations, ensuring smooth processes and client satisfaction. Her commitment to excellence ensures we deliver the highest level of service.',
  },
];

const AboutUsPage = () => {
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
      <section className="relative bg-[url('https://via.placeholder.com/1920x600')] bg-cover bg-center h-96 flex justify-center items-center wow animate__animated animate__fadeIn">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <h1 className="relative text-white text-6xl font-extrabold">About Us</h1>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-gray-50 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Image */}
            <div className="lg:w-1/2 mb-8 lg:mb-0 wow animate__animated animate__fadeInLeft">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Our team"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            
            {/* Text */}
            <div className="lg:w-1/2 lg:pl-12 text-left wow animate__animated animate__fadeInRight">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are a dedicated team of real estate professionals with a passion for helping individuals and families achieve their dream of homeownership. Our expertise spans years of hands-on experience, and we are committed to providing personalized, expert guidance every step of the way.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                Whether you're a first-time homebuyer or looking to make a strategic investment, our goal is to ensure that the process is smooth, informed, and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gray-100 py-20 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Mission</h2>

          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to redefine the homeownership journey by offering a seamless, personalized, and stress-free experience. We believe that buying a home is more than a transaction—it’s a life-changing event, and we are dedicated to making it as rewarding as possible.
            </p>
          </div>

          {/* Icons + Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Commitment Icon */}
            <div className="bg-white p-8 rounded-lg shadow-lg wow animate__animated animate__fadeInLeft">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Commitment Icon" className="mx-auto"/>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Unwavering Commitment</h3>
              <p className="text-gray-600">
                We are fully committed to walking with you through every step of the process, providing guidance, expertise, and support to ensure you find the home of your dreams.
              </p>
            </div>

            {/* Integrity Icon */}
            <div className="bg-white p-8 rounded-lg shadow-lg wow animate__animated animate__fadeInUp">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Integrity Icon" className="mx-auto"/>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Integrity at the Core</h3>
              <p className="text-gray-600">
                Honesty and transparency are at the heart of our mission. We uphold the highest standards of integrity in every interaction, ensuring that your trust in us is well-placed.
              </p>
            </div>

            {/* Excellence Icon */}
            <div className="bg-white p-8 rounded-lg shadow-lg wow animate__animated animate__fadeInRight">
              <div className="mb-6">
                <img src="https://via.placeholder.com/80" alt="Excellence Icon" className="mx-auto"/>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pursuit of Excellence</h3>
              <p className="text-gray-600">
                We go above and beyond to deliver exceptional service, ensuring that the home-buying process is smooth, informed, and filled with joy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Meet Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 wow animate__animated animate__fadeIn"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 mt-4">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20 wow animate__animated animate__fadeInUp">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md wow animate__animated animate__fadeInLeft">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Integrity</h3>
              <p className="text-gray-600">
                We prioritize honesty and transparency in every interaction, ensuring that our clients can trust us every step of the way.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md wow animate__animated animate__fadeInUp">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the first meeting to closing the deal, aiming for a seamless client experience.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md wow animate__animated animate__fadeInRight">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Commitment</h3>
              <p className="text-gray-600">
                We are committed to our clients, dedicated to helping them achieve their dreams of homeownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
