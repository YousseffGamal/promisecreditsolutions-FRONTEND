"use client"; // Mark this component as a Client Component

import { useEffect, useState } from 'react';
import Image from "next/image"; // Import Next.js Image component

import First from "../app/assets/imgs/business-people-wearing-masks-coronavirus-meeting-new-normal.jpg";
import Second from "../app/assets/imgs/group-diverse-people-having-business-meeting.jpg";
import LeftImage from "../app/assets/imgs/bgslide.png"; // Left image path
import "../app/globals.css";
import WOW from 'wowjs';
import 'animate.css'; // Import animate.css for animations
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const carouselItems = [
    {
      id: 1,
      src: Second,
      text: "Welcome to Text Credit Repair Program",
      subText: (
        <>
          Personalized <br /> Credit Repair <br /> Services
        </>
      ),
      description: (
        <>
          We are leading credit repair services company <br /> all over the world doing over 40 years.
        </>
      ),
      alt: 'Slide 1',
    },
    {
      id: 2,
      src: First,
      text: "Welcome to Text Credit Repair Program",
      subText: (
        <>
          Personalized <br /> Credit Repair <br /> Services
        </>
      ),
      description: (
        <>
          We are leading credit repair services company <br /> all over the world doing over 40 years.
        </>
      ),
      alt: 'Slide 2',
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = autoSlide ? setInterval(nextSlide, 5000) : null;
    return () => clearInterval(interval);
  }, [autoSlide]);
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);
  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="flex items-center relative h-[35rem] overflow-hidden rounded-lg md:h-[45rem]">
        {/* Left Image */}
        <div className="absolute left-0 z-10 w-1/2 h-full flex items-center justify-center">
          <Image
            src={LeftImage}
            alt="Left Image"
            className="object-contain h-full"
            layout="fill"
          />
        </div>

        {/* Carousel wrapper */}
        <div className="relative w-full h-full">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
              data-carousel-item
            >
             <Image
  src={item.src}
  className={`block w-full h-full object-cover animate__animated ${currentIndex === index ? 'animate__fadeIn' : 'animate__fadeOut'}`}
  alt={item.alt}
  layout="fill"
  objectFit="cover"
  priority
/>

            </div>
          ))}
        </div>
      </div>

      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#813a96]' : 'bg-gray-300'}`}
            aria-current={currentIndex === index ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => {
              setCurrentIndex(index);
              setAutoSlide(false); // Stop auto sliding when clicked
            }}
          />
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10.293 15.293a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 12.586l4.293-4.293a1 1 0 011.414 1.414l-5 5z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M9.707 4.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
