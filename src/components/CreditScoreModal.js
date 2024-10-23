import React, { useState } from 'react'; // Ensure useState is imported
import { Modal, Box, Typography, TextField, Button } from '@mui/material'; // Import other necessary components

const CreditScoreModal = ({ open, onClose, onSubmit, userId }) => {
  const [creditScore, setCreditScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    if (creditScore === '') {
      setError('Credit Score is required');
      return;
    }

    const parsedScore = parseInt(creditScore);

    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 850) {
      setError('Please enter a valid credit score between 0 and 850');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Send a PUT request to update the user's credit score
      const response = await fetch(`http://localhost:5000/api/users/${userId}/credit-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ creditScore: parsedScore }),
      });

      if (!response.ok) {
        throw new Error('Failed to update credit score');
      }

      const data = await response.json();

      // Pass the updated credit score back to the parent (optional)
      onSubmit(data.user.creditScore);

      // Reset input and close modal
      setCreditScore('');
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          maxWidth: 400,
          margin: 'auto',
          mt: '15%',
        }}
      >
        <Typography variant="h6" mb={2}>
          Enter Credit Score
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}
        <TextField
          label="Credit Score"
          variant="outlined"
          fullWidth
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          type="number"
          inputProps={{ min: 0, max: 850 }} // Restrict input to valid credit score range
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreditScoreModal;
