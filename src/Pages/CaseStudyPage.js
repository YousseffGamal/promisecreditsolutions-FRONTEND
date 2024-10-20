// import React, { useEffect, useState } from 'react';
// import "../app/globals.css";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import 'animate.css'; // Import animate.css for animations

// const caseStudies = [
//   {
//     name: 'John Doe',
//     image: 'https://via.placeholder.com/400x500',
//     story: 'Buying a house with their help was life-changing. They guided me from start to finish, and I’m now living in my dream home.',
//   },
//   {
//     name: 'Jane Smith',
//     image: 'https://via.placeholder.com/400x500',
//     story: 'The team’s expertise was invaluable in helping me find and purchase my home. I couldn’t have done it without them.',
//   },
//   {
//     name: 'Alex Johnson',
//     image: 'https://via.placeholder.com/400x500',
//     story: 'I didn’t think buying a home was possible, but they made it happen. My family and I are so grateful for their support.',
//   },
//   {
//     name: 'Emily Carter',
//     image: 'https://via.placeholder.com/400x500',
//     story: 'Professional, attentive, and dedicated – they found the perfect home for me, and I couldn’t be happier!',
//   },
// ];

// const CaseStudyPage = () => {
//   useEffect(() => {
//     // Import WOW.js only in the browser
//     const WOW = require('wowjs').WOW;
//     const wow = new WOW();
//     wow.init();
//   }, []);
  
//   return (
//     <>
//       <Navbar />

//       <section className="bg-white min-h-screen">
//         {/* Hero Section */}
//         <div className="relative w-full h-120 bg-cover bg-center bg">
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//             <h1 className="text-5xl text-white font-extrabold leading-tight wow animate__animated animate__fadeInDown ">Our Success Stories</h1>
//           </div>
//         </div>

//         {/* Staggered Masonry Grid */}
//         <div className="container mx-auto px-6 py-16">
//           <h2 className="text-5xl font-bold text-center mb-16 wow animate__animated animate__fadeInUp">
//             <span className="text-purple-600">Real People,</span> Real Stories
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {caseStudies.map((study, index) => (
//               <div
//                 key={index}
//                 className={`relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white p-6 ${index % 2 === 0 ? 'md:col-span-2' : 'lg:col-span-1'} wow animate__animated animate__fadeInUp`}
//                 style={{
//                   height: index % 2 === 0 ? '500px' : '400px',
//                 }}
//               >
//                 {/* Image */}
//                 <img
//                   src={study.image}
//                   alt={study.name}
//                   className="absolute inset-0 w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
//                 />
//                 {/* Overlay Content */}
//                 <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
//                   <h3 className="text-2xl font-bold text-white mb-4 wow animate__animated animate__fadeInUp">{study.name}</h3>
//                   <p className="text-white mb-4 wow animate__animated animate__fadeInUp">{study.story.substring(0, 100)}...</p>
//                   <button className="text-purple-600 bg-white px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300 wow animate__animated animate__fadeInUp">
//                     Read More
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Final CTA Section */}
//         <div className="relative bg-purple-600 text-white py-16">
//           <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-purple-600"></div>
//           <div className="container mx-auto text-center">
//             <h2 className="text-4xl font-extrabold mb-6 wow fadeInUp">Ready to Start Your Own Journey?</h2>
//             <p className="text-lg mb-8 wow fadeInUp">Let us help you find your dream home. Reach out to our team today.</p>
//             <button className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-700 hover:text-white transition-all duration-300 wow animate__animated animate__fadeInUp">
//               Contact Us
//             </button>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default CaseStudyPage;


"use client"; // Ensure this is marked as a client component

import React, { useEffect, useState } from 'react';
import "../app/globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'animate.css'; // Import animate.css for animations

const CaseStudyPage = () => {
  const [reviews, setReviews] = useState([]); // State to store fetched reviews

  // Fetch reviews from the backend on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews'); // Adjust the URL if needed
        const data = await response.json();
        setReviews(data.reviews); // Set the fetched reviews in the state
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();

    // Initialize WOW.js animation
    const WOW = require('wowjs').WOW;
    const wow = new WOW();
    wow.init();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="relative w-full h-120 bg-cover bg-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <h1 className="text-5xl text-white font-extrabold leading-tight wow animate__animated animate__fadeInDown">
              Our Success Stories
            </h1>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-5xl font-bold text-center mb-16 wow animate__animated animate__fadeInUp">
            <span className="text-purple-600">Real People,</span> Real Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={review._id}
                className={`relative rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white p-6 ${index % 2 === 0 ? 'md:col-span-2' : 'lg:col-span-1'} wow animate__animated animate__fadeInUp`}
                style={{ height: index % 2 === 0 ? '500px' : '400px' }}
              >
                <img
                  src="https://via.placeholder.com/400x500"
                  alt={review.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-4 wow animate__animated animate__fadeInUp">
                    {review.name}
                  </h3>
                  <p className="text-white mb-4 wow animate__animated animate__fadeInUp">
                    {review.message.substring(0, 100)}...
                  </p>
                  <button className="text-purple-600 bg-white px-4 py-2 rounded-full hover:bg-purple-600 hover:text-white transition-colors duration-300 wow animate__animated animate__fadeInUp">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="relative bg-purple-600 text-white py-16">
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-purple-600"></div>
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6 wow fadeInUp">
              Ready to Start Your Own Journey?
            </h2>
            <p className="text-lg mb-8 wow fadeInUp">
              Let us help you find your dream home. Reach out to our team today.
            </p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-bold hover:bg-purple-700 hover:text-white transition-all duration-300 wow animate__animated animate__fadeInUp">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CaseStudyPage;
