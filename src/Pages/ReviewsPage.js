import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Layout from '../components/Layout';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', date: '', message: '', imageUrl: null });
  const [file, setFile] = useState(null); // State for the uploaded file

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewReview({ name: '', date: '', message: '', imageUrl: null });
    setFile(null);
  };

  const handleAddReview = async () => {
    const formData = new FormData();
    formData.append('name', newReview.name);
    formData.append('date', newReview.date);
    formData.append('message', newReview.message);
    if (file) {
      formData.append('image', file); // Append the file to the FormData
    }

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setReviews([...reviews, response.data.review]); // Update state with new review
      handleClose();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0', marginTop: '65px' }}>
        <Button variant="contained" onClick={handleOpen} sx={{ marginBottom: 2 }}>
          Add Review
        </Button>

        {/* Reviews Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review, index) => (
                <TableRow key={index}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{review.message}</TableCell>
                  <TableCell>
                    {review.imageUrl ? (
                      <img src={review.imageUrl} alt="Review" style={{ width: '100px' }} />
                    ) : (
                      'No Image'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add Review Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Review</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Date"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newReview.date}
              onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={newReview.message}
              onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Image Upload"
              type="file"
              fullWidth
              onChange={(e) => setFile(e.target.files[0])} // Set file state
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddReview} variant="contained">
              Add Review
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default ReviewsPage;
