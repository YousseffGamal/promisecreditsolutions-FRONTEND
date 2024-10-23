import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState(''); // State for email input
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

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
      setEmail(''); // Clear email on close
      setError(''); // Clear error messages
      setSuccess(''); // Clear success messages
    }, 300); // Duration matches the CSS transition time
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    setError(''); // Reset error state
    setSuccess(''); // Reset success state

    try {
      const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', { email });
      setSuccess('Successfully subscribed!'); // Set success message
      setEmail(''); // Clear email input
    } catch (error) {
      setError('Subscription failed. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
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

            {error && <p className="text-red-600 mb-4">{error}</p>} {/* Error message */}
            {success && <p className="text-green-600 mb-4">{success}</p>} {/* Success message */}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button during loading
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsletterPopup;
