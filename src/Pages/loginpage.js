"use client"; // Mark this component as a Client Component
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter
import "../app/globals.css";

const loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Load remembered email from local storage
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
  }, []);

  const handleRememberMe = (checked) => {
    if (checked) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      // Log the response and check if it has the token and user data
      console.log("Full Response:", response.data);
      if (response.data && response.data.token) {
        // Save token and user data to local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
  
        // Log user info including ID to the console
        console.log("User Info:", response.data.user); // Log entire user object
        console.log("User ID:", response.data.user.id); // Log user ID
  
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        router.push("/"); // Navigate to home page only if the response is valid
      } else {
        throw new Error("Invalid response from the server");
      }
  
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred during login."
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 text-purple-600 focus:ring-purple-500"
                onChange={(e) => handleRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="flex justify-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/SignUpPage" className="text-purple-600 hover:underline">Sign Up</a></p>
        </div>

        {/* Success and Error Messages */}
        {successMessage && (
          <div className="mt-4 p-3 bg-green-200 text-green-800 rounded-md animate-fade-in">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-3 bg-red-200 text-red-800 rounded-md animate-fade-in">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default loginpage;
