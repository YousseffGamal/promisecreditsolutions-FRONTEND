import React, { useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import WOW from 'wowjs';
import 'animate.css'; // Import animate.css for animations
import first from "../app/assets/imgs/Logos/4c8d69c2c0cbad57813e2c24f56521a5x.png";
import second from "../app/assets/imgs/Logos/apple-touch-icon.png";
import third from "../app/assets/imgs/Logos/highgarden-logo.png";
import fourth from "../app/assets/imgs/Logos/indy-chamber-logo.png";
import fifth from "../app/assets/imgs/Logos/logo-horizontal.png";
import six from "../app/assets/imgs/Logos/myScoreIQ-Logo.png";
import seven from "../app/assets/imgs/Logos/REMAX-logo.png";
import eight from "../app/assets/imgs/Logos/show_image.png";
import nin from "../app/assets/imgs/Logos/Silverton_logo-vert_RGB_1200px-768x498.png";
import ten from "../app/assets/imgs/Logos/TruebloodLogo-dark.png";
import eleven from "../app/assets/imgs/Logos/ttk-logo.png";

const partners = [
  { id: 1, name: 'Partner One', logo: first },
  { id: 2, name: 'Partner Two', logo: second },
  { id: 3, name: 'Partner Three', logo: third },
  { id: 4, name: 'Partner Four', logo: fourth },
  { id: 5, name: 'Partner Five', logo: fifth },
  { id: 6, name: 'Partner Six', logo: six },
  { id: 7, name: 'Partner Seven', logo: seven },
  { id: 8, name: 'Partner Eight', logo: eight },
  { id: 9, name: 'Partner Nine', logo: nin },
  { id: 10, name: 'Partner Ten', logo: ten },
  { id: 11, name: 'Partner Eleven', logo: eleven },
];

const PartnersSection = () => {
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  return (
    <section className="bg-white py-16 overflow-hidden" id="partners">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8 wow animate__animated animate__fadeInUp">
          Our Partners
        </h2>
        <p className="text-lg text-gray-600 mb-12 wow animate__animated animate__fadeInUp">
          We are proud to collaborate with some of the best partners in the industry.
        </p>

        <div className="partners-track">
          <div className="partners-list">
            {partners.map((partner) => (
              <div key={partner.id} className="partner-item wow animate__animated animate__fadeInUp">
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
            {/* Repeat logos to create a seamless loop */}
            {partners.map((partner) => (
              <div key={`repeat-${partner.id}`} className="partner-item wow animate__animated animate__fadeInUp">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={150}
                  height={150}
                  objectFit="contain"
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
