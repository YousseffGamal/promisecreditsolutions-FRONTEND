import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [newReview, setNewReview] = useState({ name: '', date: '', message: '' });

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
    setNewReview({ name: '', date: '', message: '' });
  };

  const handleAddReview = async () => {
    const reviewData = {
      name: newReview.name,
      date: newReview.date,
      message: newReview.message,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/reviews', reviewData);
      setReviews([...reviews, response.data.review]);
      handleClose();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id)); // Filter out the deleted review
    } catch (error) {
      console.error('Error deleting review:', error);
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review._id}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{review.message}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete
                    </Button>
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
