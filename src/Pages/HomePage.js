"use client"; // Mark this component as a Client Component
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import AppointmentSection from '../components/AppointmentSection';
import ServicesSection from '../components/ServicesSection';
import Reviews from '../components/Reviews';
import Partners from '../components/Partners';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import NewsletterPopup from '../components/NewsletterPopup'; // Adjust the path as necessary

import "../app/globals.css"
const HomePage = () => {
  return (
    <>
      <NewsletterPopup />
      <Navbar />
      <Carousel />
      <AppointmentSection />
      <ServicesSection />
      <Reviews />
      <Partners />
      <ContactUs />
      <Footer />
    </>
  );
};

export default HomePage;
