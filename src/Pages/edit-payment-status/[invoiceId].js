import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const EditPaymentStatus = () => {
  const router = useRouter();
  const { invoiceId } = router.query; // Get the invoice ID from the URL
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');

    try {
      // Make a PUT request to update the payment status
      await axios.put(
        `http://localhost:5000/api/invoices/${invoiceId}`,
        { paymentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(`Updated payment status to ${paymentStatus}`);
      router.push('/AdminPanal'); // Redirect back to the Admin Panel after updating
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit Payment Status
      </Typography>

      <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={paymentStatus} onChange={handleStatusChange}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleUpdate}
        sx={{
          backgroundColor: '#6a11cb',
          '&:hover': { backgroundColor: '#2575fc' },
        }}
      >
        Update Status
      </Button>
    </Box>
  );
};

export default EditPaymentStatus;
