// SendInvoiceModal.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';

const SendInvoiceModal = ({ open, onClose, userId }) => {
  const [formData, setFormData] = useState({
    amount: '',
    dueDate: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    console.log('Sending invoice for user ID:', userId);

    try {
        const response = await axios.post(`http://localhost:5000/api/invoices`, {
            name: formData.name,
            date: new Date().toISOString().split("T")[0], // Current date
            message: formData.description, // Message from form
            price: formData.amount, // Price from form
            dueDate: formData.dueDate, // Due date from form
            userId, // Include the userId in the request payload
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('Invoice created successfully:', response.data);
        alert(response.data.message);
        onClose();
    } catch (error) {
        console.error('Error sending invoice:', error);
        console.error('Response:', error.response.data); // Log the full error response
        alert('Error sending invoice: ' + (error.response?.data?.message || error.message));
    }
};

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white for the modal
          margin: 'auto',
          marginTop: '10%',
          maxWidth: '400px',
          borderRadius: '8px',
          boxShadow: 24, // Optional: Add shadow for better visual effect
        }}
      >
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Due Date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            type="date"
            
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Send Invoice
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SendInvoiceModal;
