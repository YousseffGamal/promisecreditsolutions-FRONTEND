import React, { useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import WOW from 'wowjs';
import 'animate.css'; // Import animate.css for animations

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    rating: 4.5,
    review: 'This service is amazing! I was able to meet all my financial goals with ease and confidence.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
    rating: 5,
    review: 'Absolutely fantastic! The support and guidance I received were invaluable.',
  },
  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'https://via.placeholder.com/150',
    rating: 4,
    review: 'Very helpful and easy to work with. I would definitely recommend them to anyone.',
  },
];

const ReviewSection = () => {
  useEffect(() => {
    // Initialize WOW.js when the component mounts (on the client side)
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-50 py-16" id="reviews">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 wow animate__animated animate__fadeInUp">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 mb-12 wow animate__animated animate__fadeInUp">
          See why our clients love working with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 wow animate__animated animate__fadeInUp"
              data-wow-delay={`${review.id * 0.2}s`} // Add delay for staggered animation
            >
              <img
                src={review.avatar}
                alt={`${review.name} avatar`}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{review.name}</h3>
              <div className="flex justify-center mb-4">{renderStars(review.rating)}</div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
