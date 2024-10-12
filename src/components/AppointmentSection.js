import React from 'react';
import { InlineWidget } from 'react-calendly';

const AppointmentSection = () => {
  return (
    <section className="py-12" id="appointment">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6 text-[rgb(59,64,82)]">Book an Appointment</h2>
        <p className="text-lg text-gray-600 mb-8">Schedule a time that works best for you.</p>
        
        <div className="w-full h-screen max-w-2xl mx-auto">
          {/* Inline Calendly widget with customized colors */}
          <InlineWidget 
            url="https://calendly.com/youssefggamal552/30min" // Base Calendly URL
            pageSettings={{
              primaryColor: '813a96', // Your custom primary color (purple)
              textColor: '3b4052', // Your custom text color (dark gray)
            }}
            styles={{ height: '100%' }} // Full height for the widget
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
