// CreditScoreModal.jsx
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const CreditScoreModal = ({ open, onClose, onSubmit }) => {
  const [creditScore, setCreditScore] = useState('');

  const handleSubmit = () => {
    if (creditScore) {
      onSubmit(creditScore); // Pass the credit score back to the parent
      setCreditScore(''); // Reset the input field
      onClose(); // Close the modal
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 2, maxWidth: 400, margin: 'auto', mt: '15%' }}>
        <Typography variant="h6" mb={2}>Enter Credit Score</Typography>
        <TextField
          label="Credit Score"
          variant="outlined"
          fullWidth
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          type="number"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreditScoreModal;
