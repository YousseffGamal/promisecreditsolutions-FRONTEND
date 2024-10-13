"use client"; // Mark this component as a Client Component

import { useState, useEffect } from "react"; // Import useState and useEffect for managing state
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { FaUserCircle, FaBell } from "react-icons/fa"; // Import the profile and notification icons
import Logo from "../app/assets/imgs/pcs-1-logo_-n.png"; // Adjust the path as necessary

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the open/close status of the mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage the dropdown visibility
  const [notificationOpen, setNotificationOpen] = useState(false); // State for notification dropdown visibility
  const [user, setUser] = useState(null); // State to manage user info

  // Check for user info in local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Parse user info if available
      } catch (error) {
        console.error("Failed to parse user info from localStorage:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the dropdown state
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user info from local storage
    setUser(null); // Clear user info
    router.push("/loginpage"); // Navigate to the LoginPage
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
      if (notificationOpen && !event.target.closest(".notification-dropdown")) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, notificationOpen]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 flex-col md:flex-row">
        <div className="flex items-center mb-2 md:mb-0">
          <Image
            src={Logo}
            alt="Logo"
            className="mr-2"
            width={70}
            height={50}
          />
          <span className="text-[#813a96] text-[32px] font-bold">PCS & Associates</span>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Centered Menu Links */}
        <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 ${isOpen ? "flex" : "hidden"} md:flex md:justify-center md:flex-1`}>
          <Link href="/">
            <span className="relative text-[#3B4052] text-[20px] font-[LufgaSemiBold] py-[20px] mr-[30px] group">
              Home
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#813a96] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="/AboutUsPage">
            <span className="relative text-[#3B4052] text-[20px] font-[LufgaSemiBold] py-[20px] mr-[30px] group">
              About Us
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#813a96] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="/ServicesPage">
            <span className="relative text-[#3B4052] text-[20px] font-[LufgaSemiBold] py-[20px] mr-[30px] group">
              Services
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#813a96] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </Link>
          <Link href="/CaseStudyPage">
            <span className="relative text-[#3B4052] text-[20px] font-[LufgaSemiBold] py-[20px] mr-[30px] group">
              Case Study
              <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#813a96] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </Link>

          {/* Admin Panel Link - Displayed only if the user is an admin */}
          {/* {user?.role === "admin" && (
            <Link href="/AdminPanal">
              <span className="relative text-[#3B4052] text-[20px] font-[LufgaSemiBold] py-[20px] mr-[30px] group">
                Admin Panel
                <span className="absolute bottom-[-5px] left-0 w-0 h-[2px] bg-[#813a96] transition-[width] duration-300 ease-in-out group-hover:w-full"></span>
              </span>
            </Link>
          )} */}
        </div>

        {/* Right-aligned buttons */}
        <div className="flex items-center space-x-4 md:ml-auto relative">
          {!user ? ( // If user is not logged in, show the Login button
            <Link href="/loginpage">
              <button className="bg-[#813a96] text-white text-[15px] font-[600] px-[30px] py-[10px] rounded-[0px_10px_0px_10px] hover:bg-[#693285] relative transition duration-300">
                Login
              </button>
            </Link>
          ) : ( // If user is logged in, show the profile icon and user info
            <>
              <div className="relative dropdown">
                <button onClick={toggleDropdown} className="flex items-center">
                  <Image
                    src={`http://localhost:5000/${user.profileImage}`} // Fixing the image source
                    alt="Profile Image"
                    width={60}
                    height={80}
                    style={{ borderRadius: '50%' }}
                  />
                </button>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg border border-gray-300">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <div className="flex items-center space-x-2 mb-2">
                        <Image
                          src={`http://localhost:5000/${user.profileImage}`} // Fixing the image source
                          alt="Profile Image"
                          width={60}
                          height={80}
                          style={{ borderRadius: '50%' }}
                        />
                      </div>
                      
                      <div style={{ display: "block" }}>
                        <p className="font-semibold">{user.fullName}</p> {/* User name */}
                        <p className="text-sm text-gray-500">{user.email}</p> {/* User email */}
                      </div>
                    </div>
                    <div className="border-t border-gray-300"></div>
                    <Link href="/loginpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>

              {/* Notification Icon - Only displayed if the user is logged in */}
              <div
                className="relative"
                onMouseEnter={() => setNotificationOpen(true)}
                onMouseLeave={() => setNotificationOpen(false)}
              >
                <FaBell className="text-[20px] cursor-pointer" />
                {/* Notification Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg border border-gray-300 notification-dropdown">
                    {/* Add notification items here */}
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p>No new notifications</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
              {/* Contact Us Button */}
              <Link href="/ContactUsPage">
            <button className="bg-gray-300 text-[#3B4052] text-[15px] font-[600] px-[30px] py-[10px] rounded-[0px_10px_0px_10px] hover:bg-gray-200 relative transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
