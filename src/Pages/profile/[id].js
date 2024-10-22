import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Edit } from "@mui/icons-material"; // Import Edit icon
import Navbar from "../../components/Navbar";
import axios from "axios"; // Import axios to make API calls
import { useRouter } from "next/router"; // Import useRouter for dynamic routing
import "../../app/globals.css";
import CreditScoreGraph from '../../components/CreditScoreGraph';


const Profile = () => {
    const router = useRouter(); // Initialize useRouter
    const { id: userId } = router.query;
  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    creditScore: 0,
    profileImage: '',
    invoices: [] // Add invoices to user state
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then((response) => {
          const userData = response.data;
          console.log("Fetched User Data:", userData); // Log the fetched data
          setUser(userData);
          setSelectedImage(`http://localhost:5000/${userData.profileImage}`);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview of the image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEditClick = () => {
    // Trigger the file input click when edit button is clicked
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <Navbar />
      


      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          marginTop: "109px",
          position: "relative",
        }}
      >
        <CreditScoreGraph score={600} />
        {/* Profile Image */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            alt="Profile Image"
            src={selectedImage} // Display selected image
            sx={{ width: 242.02, height: 242.02, marginBottom: 2 }}
          />
          {/* Edit Icon */}
          <IconButton
            onClick={handleEditClick}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#000000", // Set background to #000000
              "&:hover": {
                backgroundColor: "#333333", // Optional hover effect, slightly lighter
              },
            }}
          >
            <Edit sx={{ color: "#F1F1F1" }} /> {/* Set icon color to #F1F1F1 */}
          </IconButton>

          {/* Hidden File Input */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }} // Hide the input
            accept="image/*"
            onChange={handleImageChange}
          />
        </Box>

        {/* Name */}
        <Typography className="ProfileName" variant="h5" sx={{ color: "#191919", marginBottom: 1 }}>
          {user.fullName} {/* Dynamic Name from backend/localStorage */}
        </Typography>

        {/* Email */}
        <Typography className="ProfileInfo" variant="body1" sx={{ color: "#757575", marginBottom: 1 }}>
          {user.email} {/* Dynamic Email from backend/localStorage */}
        </Typography>

        {/* Credit Score */}
        <Typography className="ProfileInfo" variant="body1" sx={{ color: "#757575" }}>
          Credit score: {user.creditScore} {/* Dynamic Credit Score */}
        </Typography>

        {/* Invoices Section */}
        <Box sx={{ width: '100%', marginTop: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Invoices
          </Typography>

          {user.invoices.length > 0 ? (
            <List>
              {user.invoices.map((invoice, index) => (
                <ListItem key={invoice._id}>
                <ListItemText
                  primary={`Name: ${invoice.name}`} // Display the name of the invoice
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        Message: {invoice.message}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Price: ${invoice.price}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Date: {new Date(invoice.date).toLocaleDateString()}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2">
                        Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              
              ))}
            </List>
          ) : (
            <Typography variant="body2" sx={{ color: "#757575" }}>
              No invoices available.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
