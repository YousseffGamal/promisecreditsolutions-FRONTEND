import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter
import SendInvoiceModal from '../components/SendInvoiceModal'; // Adjust the import path accordingly
import CreditScoreModal from '../components/CreditScoreModal'; // Adjust the path accordingly
import CreditScoreGraph from '../components/CreditScoreGraph'; // Import your graph component

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  TablePagination,
  Switch,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Layout from '../components/Layout';
import "../app/globals.css";
import "../app/test.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [RoleFilter, setRoleFilter] = useState('All');
  const [userCount, setUserCount] = useState(0); // Declare userCount before using it
  const [clientsData, setClientsData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [invoiceCount, setInvoiceCount] = useState(0); // Declare invoiceCount state
  const router = useRouter(); // Define router here
  const [modalOpen, setModalOpen] = useState(false);
  const [showGraph, setShowGraph] = useState(false); // State to control graph visibility
  // Existing state
  const [creditScore, setCreditScore] = useState(null);
  const [showCreditScoreModal, setShowCreditScoreModal] = useState(false); // State for the credit score modal
  // Move the stats array declaration below userCount initialization
  const [creditScores, setCreditScores] = useState({}); // Change to an object to hold scores per user

  const stats = [
    { title: 'No. Of Users', value: userCount, bgColor: '#0177FB', textColor: '#fff' },
    { title: 'No. Of Invoice', value: invoiceCount, bgColor: '#FFFFFF', textColor: '#000000' }, // Use invoiceCount
    { title: 'No. Of Sold Leads', value: 25, bgColor: '#FFFFFF', textColor: '#000000' },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
  
    try {
      // Make a DELETE request to your API to delete the user by ID
      await axios.delete(`http://localhost:5000/api/users/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // After successful deletion, remove the user from the local state
      setClientsData((prevData) => prevData.filter((user) => user._id !== currentUserId));
      console.log(`Deleted user with ID: ${currentUserId}`);
  
      handleClose(); // Close the dropdown menu after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  
  const getPaymentStatusStyles = (paymentStatus) => {
    switch (paymentStatus) {
      case 'pending':
        return { color: '#0466D4', backgroundColor: '#f0f7ff', borderRadius: '25.74px', padding: '4px 8px' };
      case 'paid':
        return { color: '#CB0A1D', backgroundColor: '#ffebed', borderRadius: '25.74px', padding: '4px 8px' };
      case 'cancelled':
        return { color: '#D0A704', backgroundColor: '#fffae6', borderRadius: '25.74px', padding: '4px 8px' };
      default:
        return {};
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSwitchChange = (event) => {
    setActiveTab(event.target.checked ? 1 : 0);
    setPage(0);
  };

  const fetchClientsData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientsData(response.data);
      setUserCount(response.data.length); // Update userCount with the fetched data
    } catch (error) {
      console.error('Error fetching clients data:', error);
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchInvoiceData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get('http://localhost:5000/api/invoices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.invoices)) {
        setLeadsData(response.data.invoices);
      } else {
        console.error('Unexpected data format for invoices:', response.data);
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);
  const fetchInvoiceCount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get('http://localhost:5000/api/invoices/count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming your API returns the count in a specific format
      setInvoiceCount(response.data.count); // Adjust according to your API response format
    } catch (error) {
      console.error('Error fetching invoice count:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceCount(); // Fetch invoice count when the component mounts
  }, []);


  const handleSendInvoice = () => {
    setModalOpen(true); // Open the modal
  };
  const handleCloseModal = () => {
    setModalOpen(false); // Close the modal
  };
  // Function to open the modal
  const handleOpenCreditScoreModal = (userId) => {
    setCurrentUserId(userId);
    setShowCreditScoreModal(true);
  };

  const handleCreditScoreSubmit = (score) => {
    setCreditScores((prevScores) => ({ ...prevScores, [currentUserId]: score })); // Update score for the specific user
    setShowCreditScoreModal(false);
  };
  const handleDeleteInvoice = async () => {
    const token = localStorage.getItem("token");

    try {
      // Make a DELETE request to your API to delete the invoice by ID
      await axios.delete(`http://localhost:5000/api/invoices/${currentUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful deletion, remove the invoice from the local state
      setLeadsData((prevData) => prevData.filter((invoice) => invoice._id !== currentUserId));
      console.log(`Deleted invoice with ID: ${currentUserId}`);

      handleClose(); // Close the dropdown menu after deletion
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };
  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        {/* Statistics Boxes */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: stat.bgColor,
                padding: '16px',
                borderRadius: '30px',
                width: { xs: '100%', sm: '465px' },
                height: '195px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                className='CardNumber'
                variant="h1"
                sx={{
                  color: stat.textColor,
                  fontWeight: 'bold',
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '78px' },
                }}
              >
                {stat.value}
              </Typography>
              <Box
                sx={{
                  width: '60%',
                  height: '1px',
                  backgroundColor: stat.textColor,
                  my: 1,
                  opacity: 0.5,
                  mx: 'auto',
                }}
              />
              <Typography className='TitleCard' variant="h6" sx={{ color: stat.textColor }}>
                {stat.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Labels, Switch, and Role Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: activeTab === 0 ? '#0177FB' : '#000', mr: 2 }}>
            Invoices
          </Typography>
          <Switch
            checked={activeTab === 1}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'Switch between Leads and Clients' }}
          />
          <Typography variant="h6" sx={{ color: activeTab === 1 ? '#0177FB' : '#000', ml: 2 }}>
            Users
          </Typography>
        </Box>

        {/* Table based on active tab */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', color: '#ffffff', borderRadius: '30px', mt: 2, overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                {activeTab === 0 ? (
                  <>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Invoice</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Date</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Price</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Payment Status</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Due Date</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Action</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Client Name</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Email</TableCell>
                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Role</TableCell>
                    {/* <TableCell className='TableHeader' sx={{ color: '#667085' }}>Send Invoice</TableCell> */}
                    {/* <TableCell className='TableHeader' sx={{ color: '#667085' }}>Credit Score</TableCell> */}

                    <TableCell className='TableHeader' sx={{ color: '#667085' }}>Action</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(activeTab === 0 ? leadsData : clientsData)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {activeTab === 0 ? (
                      <>
                                 <TableCell>{row.name}</TableCell>
                        <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                        <TableCell>{row.price}</TableCell>
                        <TableCell>
                          <span style={getPaymentStatusStyles(row.paymentStatus)}>
                            {row.paymentStatus}
                          </span>
                        </TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>
                          <MoreVertIcon onClick={(event) => handleClick(event, row._id)} />
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleDeleteInvoice}>Delete</MenuItem> {/* Call delete function here */}
                          </Menu>

                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{row.fullName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        {/* <TableCell>
                        <Button
        onClick={handleSendInvoice}
        className="editButton"
        sx={{
          color: 'white',
          backgroundColor: '#0177FB',
          padding: '8px 16px',
          borderRadius: '25px',
          '&:hover': { backgroundColor: '#0166D4' },
        }}
      >
        Send
      </Button>
    
</TableCell> */}
                        {/* <TableCell>

                          <SendInvoiceModal
                            open={modalOpen}
                            onClose={handleCloseModal}
                            userId={row._id} // Pass the userId to the modal
                          />
                          <Button
                            onClick={() => handleOpenCreditScoreModal(row._id)} // Pass userId to open modal
                            variant="contained"
                            sx={{ backgroundColor: '#0177FB', color: '#fff' }}
                          >
                            Enter Credit Score
                          </Button>
                       


                        </TableCell> */}
                        <CreditScoreModal
                            open={showCreditScoreModal}
                            onClose={() => setShowCreditScoreModal(false)}
                            onSubmit={handleCreditScoreSubmit}
                            userId={currentUserId}
                          />
                          {creditScores[row._id] && ( // Check if score exists for the user
                            <CreditScoreGraph score={creditScores[row._id]} /> // Pass the score to your graph
                          )}

                        <TableCell>
                          <MoreVertIcon onClick={(event) => handleClick(event, row._id)} />
                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            <MenuItem onClick={handleSendInvoice} >Send Invoice	</MenuItem>
                            <MenuItem onClick={() => handleOpenCreditScoreModal(row._id)} // Pass userId to open modal
                            > Enter Credit Score</MenuItem>

                          </Menu>
                          {modalOpen && (
          <SendInvoiceModal
            open={modalOpen}
            onClose={handleCloseModal}
            userId={currentUserId}
          />
        )}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={activeTab === 0 ? leadsData.length : clientsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Layout>
  );
};

export default AdminPanel;
