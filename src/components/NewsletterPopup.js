import React, { useState, useEffect } from 'react';

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger the modal when the homepage loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setIsVisible(true); // Start showing after opening
      }, 50); // Delay to trigger animation smoothly
    }, 2000); // Opens after 2 seconds
    
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  const closeModal = () => {
    setIsVisible(false); // Trigger hide animation
    setTimeout(() => {
      setIsOpen(false); // Remove popup from DOM after animation
    }, 300); // Duration matches the CSS transition time
  };

  return (
    <>
      {isOpen && (
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Subscribe to our Newsletter</h2>
            <p className="text-gray-600 mb-6">Stay updated with our latest news and offers. Enter your email below.</p>
            <form>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;
