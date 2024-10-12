import React, { useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import WOW from 'wowjs';
import 'animate.css'; // Import animate.css for animations

const partners = [
  {
    id: 1,
    name: 'Partner One',
    logo: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Partner Two',
    logo: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Partner Three',
    logo: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Partner Four',
    logo: 'https://via.placeholder.com/150',
  },
];

const PartnersSection = () => {
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  return (
    <section className="bg-white py-16" id="partners">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 wow animate__animated animate__fadeInUp">
          Our Partners
        </h2>
        <p className="text-lg text-gray-600 mb-12 wow animate__animated animate__fadeInUp">
          We are proud to collaborate with some of the best partners in the industry.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="flex items-center justify-center wow animate__animated animate__fadeInUp"
              data-wow-delay={`${index * 0.2}s`} // Add delay for staggered animation
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={150}  // Set image width
                height={150} // Set image height
                objectFit="contain"
                className="mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
