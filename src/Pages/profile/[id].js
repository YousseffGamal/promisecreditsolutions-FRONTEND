// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { Edit } from "@mui/icons-material"; // Import Edit icon
// import Navbar from "../../components/Navbar";
// import axios from "axios"; // Import axios to make API calls
// import { useRouter } from "next/router"; // Import useRouter for dynamic routing
// import "../../app/globals.css";
// import CreditScoreGraph from "../../components/CreditScoreGraph";

// const Profile = () => {
//   const router = useRouter(); // Initialize useRouter
//   const { id: userId } = router.query;

//   const [selectedImage, setSelectedImage] = useState(null); // State to store selected image
//   const [user, setUser] = useState({
//     fullName: "",
//     email: "",
//     creditScore: [], // Initialize as an array to store credit scores
//     profileImage: "",
//     invoices: [], // Add invoices to user state
//   });

//   const [firstScore, setFirstScore] = useState(null); // Store the first score
//   const [latestScore, setLatestScore] = useState(null); // Store the latest score

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Get the token from localStorage
//     if (userId) {
//       axios
//         .get(`http://localhost:5000/api/users/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//           },
//         })
//         .then((response) => {
//           const userData = response.data; // Store response data
//           console.log("Fetched User Data:", userData); // Log the fetched data
//           setUser(userData); // Set user state
//           setSelectedImage(`http://localhost:5000/${userData.profileImage}`); // Set profile image

//           // Extract first and latest credit scores
//           if (userData.creditScore.length > 0) {
//             setFirstScore(userData.creditScore[0]); // First score
//             setLatestScore(
//               userData.creditScore[userData.creditScore.length - 1]
//             ); // Latest score
//           }
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, [userId]); // Dependency array with userId

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Create a preview of the image
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//     }
//   };

//   const handleEditClick = () => {
//     // Trigger the file input click when edit button is clicked
//     document.getElementById("fileInput").click();
//   };

//   return (
//     <>
//       <Navbar />

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           p: 3,
//           marginTop: "109px",
//           position: "relative",
//         }}
//       >
//         {/* Render the graphs with the first and latest scores */}
//         {firstScore !== null && (
//           <CreditScoreGraph score={firstScore} title="First Credit Score" />
//         )}
//         {latestScore !== null && (
//           <CreditScoreGraph score={latestScore} title="Latest Credit Score" />
//         )}

//         {/* Profile Image */}
//         <Box sx={{ position: "relative" }}>
//           <Avatar
//             alt="Profile Image"
//             src={selectedImage} // Display selected image
//             sx={{ width: 242.02, height: 242.02, marginBottom: 2 }}
//           />
//           {/* Edit Icon */}
//           <IconButton
//             onClick={handleEditClick}
//             sx={{
//               position: "absolute",
//               bottom: 0,
//               right: 0,
//               backgroundColor: "#000000", // Set background to #000000
//               "&:hover": {
//                 backgroundColor: "#333333", // Optional hover effect, slightly lighter
//               },
//             }}
//           >
//             <Edit sx={{ color: "#F1F1F1" }} /> {/* Set icon color to #F1F1F1 */}
//           </IconButton>

//           {/* Hidden File Input */}
//           <input
//             type="file"
//             id="fileInput"
//             style={{ display: "none" }} // Hide the input
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </Box>

//         {/* Name */}
//         <Typography
//           className="ProfileName"
//           variant="h5"
//           sx={{ color: "#191919", marginBottom: 1 }}
//         >
//           {user.fullName} {/* Dynamic Name from backend/localStorage */}
//         </Typography>

//         {/* Email */}
//         <Typography
//           className="ProfileInfo"
//           variant="body1"
//           sx={{ color: "#757575", marginBottom: 1 }}
//         >
//           {user.email} {/* Dynamic Email from backend/localStorage */}
//         </Typography>

//         {/* Credit Score */}
//         <Typography className="ProfileInfo" variant="body1" sx={{ color: "#757575" }}>
//           Credit Scores: {user.creditScore.join(", ")} {/* Display all scores */}
//         </Typography>

//         {/* Invoices Section */}
//         <Box sx={{ width: "100%", marginTop: 3 }}>
//           <Typography variant="h6" sx={{ marginBottom: 2 }}>
//             Invoices
//           </Typography>

//           {user.invoices.length > 0 ? (
//             <List>
//               {user.invoices.map((invoice, index) => (
//                 <ListItem key={invoice._id}>
//                   <ListItemText
//                     primary={`Name: ${invoice.name}`} // Display the name of the invoice
//                     secondary={
//                       <>
//                         <Typography component="span" variant="body2">
//                           Message: {invoice.message}
//                         </Typography>
//                         <br />
//                         <Typography component="span" variant="body2">
//                           Price: ${invoice.price}
//                         </Typography>
//                         <br />
//                         <Typography component="span" variant="body2">
//                           Date: {new Date(invoice.date).toLocaleDateString()}
//                         </Typography>
//                         <br />
//                         <Typography component="span" variant="body2">
//                           Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
//                         </Typography>
//                       </>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography variant="body2" sx={{ color: "#757575" }}>
//               No invoices available.
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material"; 
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import "../../app/globals.css";
import CreditScoreGraph from "../../components/CreditScoreGraph";

const Profile = () => {
  const router = useRouter();
  const { id: userId } = router.query;

  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    creditScore: [],
    profileImage: "",
    invoices: [],
  });

  const [firstScore, setFirstScore] = useState(null);
  const [latestScore, setLatestScore] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setSelectedImage(`http://localhost:5000/${userData.profileImage}`);

          if (userData.creditScore.length > 0) {
            setFirstScore(userData.creditScore[0]);
            setLatestScore(userData.creditScore[userData.creditScore.length - 1]);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [userId]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleEditClick = () => {
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
        {/* Render the graphs */}
        <Box sx={{ display: "flex", gap: 3, marginBottom: 4 }}>
          {firstScore !== null && (
            <CreditScoreGraph score={firstScore} title="First Credit Score" />
          )}
          {latestScore !== null && (
            <CreditScoreGraph score={latestScore} title="Latest Credit Score" />
          )}
        </Box>

        {/* Profile Image Card */}
        <Card sx={{ maxWidth: 300, textAlign: "center", mb: 3 }}>
          <CardContent>
            <Avatar
              alt="Profile Image"
              src={selectedImage}
              sx={{ width: 150, height: 150, margin: "0 auto" }}
            />
            <IconButton
              onClick={handleEditClick}
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "#333333" },
              }}
            >
              <Edit sx={{ color: "#F1F1F1" }} />
            </IconButton>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
              {user.fullName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>
          </CardContent>
        </Card>

        {/* Credit Scores */}
        <Box sx={{ width: "100%", maxWidth: 600, mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Credit Scores
              </Typography>
              <Typography>
                {user.creditScore.length > 0
                  ? user.creditScore.join(", ")
                  : "No credit scores available."}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Invoices Section */}
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Invoices
          </Typography>

          {user.invoices.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {user.invoices.map((invoice) => (
                    <TableRow key={invoice._id}>
                      <TableCell>
                        <Typography variant="subtitle1">
                          {invoice.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{invoice.message}</TableCell>
                      <TableCell>${invoice.price}</TableCell>
                      <TableCell>
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No invoices available.</Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </Button>
      </Box>
    </>
  );
};

export default Profile;
