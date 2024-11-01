// import React, { useState } from 'react'; 
// import { Modal, Box, Typography, TextField, Button } from '@mui/material'; 

// const CreditScoreModal = ({ open, onClose, onSubmit, userId }) => {
//   const [creditScore, setCreditScore] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     if (!userId) {
//       setError('User ID is missing');
//       return;
//     }

//     if (creditScore === '') {
//       setError('Credit Score is required');
//       return;
//     }

//     const parsedScore = parseInt(creditScore);

//     if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 850) {
//       setError('Please enter a valid credit score between 0 and 850');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');

//       // Send a PUT request to update the user's credit score
//       const response = await fetch(`http://localhost:5000/api/users/${userId}/credit-score`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ score: parsedScore }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update credit score');
//       }

//       const data = await response.json();

//       // Optional: Pass the updated credit score array back to the parent component
//       onSubmit(data.user.creditScore);

//       // Reset input and close modal
//       setCreditScore('');
//       onClose();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           padding: 4,
//           backgroundColor: '#fff',
//           borderRadius: 2,
//           maxWidth: 400,
//           margin: 'auto',
//           mt: '15%',
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Enter Credit Score
//         </Typography>
//         {error && <Typography color="error" mb={2}>{error}</Typography>}
//         <TextField
//           label="Credit Score"
//           variant="outlined"
//           fullWidth
//           value={creditScore}
//           onChange={(e) => setCreditScore(e.target.value)}
//           type="number"
//           inputProps={{ min: 0, max: 850 }} 
//         />
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//           <Button onClick={onClose} variant="outlined" sx={{ mr: 2 }}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} variant="contained" disabled={loading}>
//             {loading ? 'Submitting...' : 'Submit'}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default CreditScoreModal;



import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const CreditScoreModal = ({ open, onClose, onSubmit, userId }) => {
  const [transunion, setTransunion] = useState('');
  const [experian, setExperian] = useState('');
  const [equifax, setEquifax] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateScore = (score) => {
    const parsedScore = parseInt(score);
    return !isNaN(parsedScore) && parsedScore >= 0 && parsedScore <= 850;
  };

  const handleSubmit = async () => {
    if (!userId) {
      setError('User ID is missing');
      return;
    }

    if (!validateScore(transunion) || !validateScore(experian) || !validateScore(equifax)) {
      setError('Please enter valid credit scores between 0 and 850 for all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const body = {
        transunion: parseInt(transunion),
        experian: parseInt(experian),
        equifax: parseInt(equifax),
      };

      // Send a PUT request to update the user's credit scores
      const response = await fetch(`http://localhost:5000/api/credit-scores/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('body:', body);
      if (!response.ok) {
        throw new Error('Failed to update credit scores');
      }

      const data = await response.json();
      console.log('data.data:', data.data);

      // Optional: Pass the updated credit scores array back to the parent component
      onSubmit(data.data);

      // Reset inputs and close modal
      setTransunion('');
      setExperian('');
      setEquifax('');
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
          Enter Credit Scores
        </Typography>
        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <TextField
          label="Transunion Score"
          variant="outlined"
          fullWidth
          value={transunion}
          onChange={(e) => setTransunion(e.target.value)}
          type="number"
          inputProps={{ min: 0, max: 850 }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Experian Score"
          variant="outlined"
          fullWidth
          value={experian}
          onChange={(e) => setExperian(e.target.value)}
          type="number"
          inputProps={{ min: 0, max: 850 }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Equifax Score"
          variant="outlined"
          fullWidth
          value={equifax}
          onChange={(e) => setEquifax(e.target.value)}
          type="number"
          inputProps={{ min: 0, max: 850 }}
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
