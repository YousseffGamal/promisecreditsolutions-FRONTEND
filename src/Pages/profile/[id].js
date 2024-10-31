



// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Card,
//   CardContent,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   TableHead,
// } from "@mui/material";
// import { Edit } from "@mui/icons-material"; 
// import Navbar from "../../components/Navbar";
// import axios from "axios";
// import { useRouter } from "next/router";
// import "../../app/globals.css";
// import CreditScoreGraph from "../../components/CreditScoreGraph";

// const Profile = () => {
//   const router = useRouter();
//   const { id: userId } = router.query;

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [user, setUser] = useState({
//     fullName: "",
//     email: "",
//     creditScore: [],
//     profileImage: "",
//     invoices: [],
//   });

//   const [firstScore, setFirstScore] = useState(null);
//   const [latestScore, setLatestScore] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (userId) {
//       axios
//         .get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           const userData = response.data;
//           setUser(userData);
//           setSelectedImage(`http://localhost:5000/${userData.profileImage}`);

//           if (userData.creditScore.length > 0) {
//             setFirstScore(userData.creditScore[0]);
//             setLatestScore(userData.creditScore[userData.creditScore.length - 1]);
//           }
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, [userId]);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setSelectedImage(imageUrl);
//     }
//   };

//   const handleEditClick = () => {
//     document.getElementById("fileInput").click();
//   };

//   return (
//     <>
//       <Navbar />
//       <Box
//         sx={{
//           minHeight: "100vh",
//           paddingTop: "5rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backgroundColor: "#f5f5f5", // Subtle light grey background for page
//         }}
//       >
//         {/* Profile Card */}
//         <Card
//           sx={{
//             maxWidth: 400,
//             textAlign: "center",
//             borderRadius: 3,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "#fff",
//             marginBottom: 4,
//             padding: 3,
//           }}
//         >
//           <Avatar
//             alt="Profile Image"
//             src={selectedImage}
//             sx={{
//               width: 150,
//               height: 150,
//               margin: "0 auto",
//               border: "6px solid #6a11cb",
//               boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
//             }}
//           />
//           <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
//             {user.fullName}
//           </Typography>
//           <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
//             {user.email}
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#6a11cb",
//               "&:hover": { backgroundColor: "#2575fc" },
//               marginTop: 2,
//               borderRadius: 3,
//               padding: "10px 20px",
//               boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             Edit Profile
//           </Button>
//         </Card>

//         {/* Graphs and Credit Scores Card */}
//         <Card
//           sx={{
//             width: "90%",
//             maxWidth: 1000,
//             borderRadius: 3,
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             backgroundColor: "#ffffff",
//             padding: 4,
//             marginBottom: 4,
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 5,
//               justifyContent: "center",
//               alignItems: "center",
//               marginBottom: 4,
//             }}
//           >
//             {firstScore !== null && (
//               <Box sx={{ textAlign: "center" }}>
//                 <CreditScoreGraph score={firstScore} title="First Credit Score" />
//               </Box>
//             )}
//             {latestScore !== null && (
//               <Box sx={{ textAlign: "center" }}>
//                 <CreditScoreGraph score={latestScore} title="Latest Credit Score" />
//               </Box>
//             )}
//           </Box>

//           {/* Credit Scores Section */}
//           <Typography
//             variant="h6"
//             gutterBottom
//             sx={{ fontWeight: "bold", color: "#6a11cb", textAlign: "center" }}
//           >
//             Credit Scores
//           </Typography>
//           <Typography textAlign="center">
//             {user.creditScore.length > 0 ? (
//               <>
//                 First: {firstScore}, Latest: {latestScore}
//               </>
//             ) : (
//               "No credit scores available."
//             )}
//           </Typography>
//         </Card>

//         {/* Invoices Section */}
//         <Box sx={{ width: "100%", maxWidth: 800, marginBottom: 6 }}>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
//             Invoices
//           </Typography>
//           {user.invoices.length > 0 ? (
//             <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
//               <Table>
//               <TableHead>
//               <TableRow>
                
//                   <>
                    
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Name</TableCell>
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Message</TableCell>
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Price</TableCell>
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Date</TableCell>
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Due Date</TableCell>
//                     <TableCell className='TableHeader' sx={{ color: '#667085' }}>Payment Status</TableCell>
//                   </>
                
//               </TableRow>
//             </TableHead>
//                 <TableBody>
//                   {user.invoices.map((invoice) => (
//                     <TableRow key={invoice._id}>
//                       <TableCell>
//                         <Typography variant="subtitle1">{invoice.name}</Typography>
//                       </TableCell>
//                       <TableCell>{invoice.message}</TableCell>
//                       <TableCell>${invoice.price}</TableCell>
//                       <TableCell>
//                         {new Date(invoice.date).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell>
//                         {new Date(invoice.dueDate).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell>
//                         {invoice.paymentStatus}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography>No invoices available.</Typography>
//           )}
//         </Box>

//         {/* Floating Action Button */}
//         <IconButton
//           sx={{
//             position: "fixed",
//             bottom: 16,
//             right: 16,
//             backgroundColor: "#6a11cb",
//             "&:hover": { backgroundColor: "#2575fc" },
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
//           }}
//         >
//           <Edit sx={{ color: "#ffffff" }} />
//         </IconButton>
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
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
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
    profileImage: "",
    invoices: [],
  });
  const [creditScores, setCreditScores] = useState({
    transunion: [],
    experian: [],
    equifax: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (userId) {
      // Fetch user data
      axios
        .get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setSelectedImage(`http://localhost:5000/${userData.profileImage}`);
        })
        .catch((error) => console.error("Error fetching user data:", error));

      // Fetch credit scores data
      axios
        .get(`http://localhost:5000/api/credit-scores/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const creditData = response.data.data; // Access data property in response
          setCreditScores(creditData);
        })
        .catch((error) => console.error("Error fetching credit scores:", error));
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
          minHeight: "100vh",
          paddingTop: "5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Profile Card */}
        <Card
          sx={{
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            marginBottom: 4,
            padding: 3,
          }}
        >
          <Avatar
            alt="Profile Image"
            src={selectedImage}
            sx={{
              width: 150,
              height: 150,
              margin: "0 auto",
              border: "6px solid #6a11cb",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
            }}
          />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
            {user.fullName}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6a11cb",
              "&:hover": { backgroundColor: "#2575fc" },
              marginTop: 2,
              borderRadius: 3,
              padding: "10px 20px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Edit Profile
          </Button>
        </Card>

        {/* Credit Scores Section */}
        <Card
          sx={{
            width: "90%",
            maxWidth: 1000,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            padding: 4,
            marginBottom: 4,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#6a11cb", textAlign: "center" }}
          >
            Credit Scores
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            {creditScores.transunion.length > 0 && (
              <Box sx={{ textAlign: "center" }}>
                <CreditScoreGraph
                  score={creditScores.transunion[creditScores.transunion.length - 1]}
                  title="Latest Transunion Score"
                />
                <Typography variant="subtitle1">
                  First Score: {creditScores.transunion[0]}
                </Typography>
              </Box>
            )}
            {creditScores.experian.length > 0 && (
              <Box sx={{ textAlign: "center" }}>
                <CreditScoreGraph
                  score={creditScores.experian[creditScores.experian.length - 1]}
                  title="Latest Experian Score"
                />
                <Typography variant="subtitle1">
                  First Score: {creditScores.experian[0]}
                </Typography>
              </Box>
            )}
            {creditScores.equifax.length > 0 && (
              <Box sx={{ textAlign: "center" }}>
                <CreditScoreGraph
                  score={creditScores.equifax[creditScores.equifax.length - 1]}
                  title="Latest Equifax Score"
                />
                <Typography variant="subtitle1">
                  First Score: {creditScores.equifax[0]}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>

        {/* Invoices Section */}
        <Box sx={{ width: "100%", maxWidth: 800, marginBottom: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Invoices
          </Typography>
          {user.invoices.length > 0 ? (
            <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#667085' }}>Name</TableCell>
                    <TableCell sx={{ color: '#667085' }}>Message</TableCell>
                    <TableCell sx={{ color: '#667085' }}>Price</TableCell>
                    <TableCell sx={{ color: '#667085' }}>Date</TableCell>
                    <TableCell sx={{ color: '#667085' }}>Due Date</TableCell>
                    <TableCell sx={{ color: '#667085' }}>Payment Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.invoices.map((invoice) => (
                    <TableRow key={invoice._id}>
                      <TableCell>{invoice.name}</TableCell>
                      <TableCell>{invoice.message}</TableCell>
                      <TableCell>${invoice.price}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No invoices available.</Typography>
          )}
        </Box>

        <IconButton
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "#6a11cb",
            "&:hover": { backgroundColor: "#2575fc" },
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Edit sx={{ color: "#ffffff" }} />
        </IconButton>
      </Box>
    </>
  );
};

export default Profile;
