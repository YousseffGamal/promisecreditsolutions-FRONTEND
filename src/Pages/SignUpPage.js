"use client"; // Mark this component as a Client Component
import React, { useState } from "react";
import axios from "axios";
import "../app/globals.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setSuccessMessage(response.data.message || "Registration successful!");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      // Check if error is an Axios error with a response
      if (error.response) {
        // The request was made and the server responded with a status code
        setErrorMessage(error.response.data.message || "An error occurred during registration.");
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an error
        setErrorMessage("Error: " + error.message);
      }
      
      setSuccessMessage(""); // Clear any previous success messages
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600">Create an Account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label htmlFor="confirm-password" className="block mb-1 text-sm font-semibold text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="profile-img" className="block mb-1 text-sm font-semibold text-gray-700">Profile Image</label>
            <input
              type="file"
              id="profile-img"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/LoginPage" className="text-purple-600 hover:underline">Log In</a>
          </p>
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

export default SignUpPage;
