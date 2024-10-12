import React, { useState } from 'react';
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
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Navbar from '../components/Navbar';
import '../app/globals.css';

const AdminPanal = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({ amount: '', description: '' });

  const stats = [
    { title: 'No. Of Users', value: 150, bgColor: '#0177FB', textColor: '#fff' },
    { title: 'No. Of Invoice', value: 80, bgColor: '#FFFFFF', textColor: '#000000' },
    { title: 'No. Of Sold Leads', value: 25, bgColor: '#FFFFFF', textColor: '#000000' },
  ];

  const leadsData = [
    { id: 1, sellerName: 'John Doe', email: 'john@example.com', dateAdded: '2024-01-15', state: 'Active', closingTime: '2024-12-01', status: 'Pending' },
    { id: 2, sellerName: 'Alice Johnson', email: 'alice@example.com', dateAdded: '2024-02-10', state: 'Inactive', closingTime: '2024-11-20', status: 'Paid' },
    { id: 3, sellerName: 'Mark Smith', email: 'mark@example.com', dateAdded: '2024-03-12', state: 'Active', closingTime: '2024-12-01', status: 'Cancelled' },
    // ... (other lead data)
    { id: 17, sellerName: 'Sophia Young', email: 'sophia@example.com', dateAdded: '2024-12-01', state: 'Active', closingTime: '2025-01-20', status: 'Pending' },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setInvoiceDetails({ amount: '', description: '' });
  };

  const handleSendInvoice = () => {
    console.log(`Invoice sent to user ID: ${currentUserId}`, invoiceDetails);
    handleDialogClose();
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Pending':
        return { color: '#D0A704', backgroundColor: '#fffae6', borderRadius: '25.74px' };
      case 'Paid':
        return { color: '#0466D4', backgroundColor: '#f0f7ff', borderRadius: '25.74px' };
      case 'Cancelled':
        return { color: '#CB0A1D', backgroundColor: '#ffebed', borderRadius: '25.74px' };
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

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleMenuItemClick = (action) => {
    handleClose();
    if (action === 'sendInvoice') {
      handleDialogOpen();
    } else if (action === 'deleteLead') {
      console.log(`Lead with ID: ${currentUserId} deleted.`);
      // Add delete logic here (e.g., make an API call to delete the lead)
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, backgroundColor: '#F1F1F1', color: '#e0e0e0' }}>
        {/* Statistics Boxes */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: stat.bgColor,
                padding: '16px',
                borderRadius: '30px',
                width: '33%',
                textAlign: 'center',
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h2" sx={{ color: stat.textColor, fontWeight: 'bold', fontSize: { xs: '2rem', sm: '3rem' } }}>
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
              <Typography variant="h6" sx={{ color: stat.textColor }}>
                {stat.title}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Labels and Status Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#0177FB', mr: 2 }}>
            Leads
          </Typography>
          <FormControl variant="outlined" sx={{ ml: 2, minWidth: 200 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status"
              sx={{
                bgcolor: '#FFFFFF',
                borderRadius: '16.65px',
                '& .MuiSelect-select': {
                  padding: '10px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#757575',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#757575',
                },
              }}
            >
              <MuiMenuItem value="All">All</MuiMenuItem>
              <MuiMenuItem value="Pending">Pending</MuiMenuItem>
              <MuiMenuItem value="Paid">Paid</MuiMenuItem>
              <MuiMenuItem value="Cancelled">Cancelled</MuiMenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Leads Table */}
        <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF', color: '#ffffff', borderRadius: '30px', mt: 2 }}>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#667085' }}>Name</TableCell>
                <TableCell sx={{ color: '#667085' }}>Email</TableCell>
                <TableCell sx={{ color: '#667085' }}>Status</TableCell>
                <TableCell sx={{ color: '#667085' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadsData
                .filter((lead) => statusFilter === 'All' || lead.status === statusFilter) // Filter leads based on status
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  const statusStyles = getStatusStyles(user.status);
                  return (
                    <TableRow key={user.id}>
                      <TableCell sx={{ color: '#101828' }}>{user.sellerName}</TableCell>
                      <TableCell sx={{ color: '#101828' }}>{user.email}</TableCell>
                      <TableCell sx={{ color: '#101828' }}>
                        <Box sx={{ ...statusStyles, padding: '5px 10px', display: 'inline-block' }}>{user.status}</Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          onClick={(event) => handleClick(event, user.id)}
                          sx={{
                            color: '#5D68A0',
                            '&:hover': {
                              backgroundColor: '#E3F2FD',
                            },
                          }}
                        >
                          <MoreVertIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={leadsData.filter((lead) => statusFilter === 'All' || lead.status === statusFilter).length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        {/* Action Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleMenuItemClick('sendInvoice')}>Send Invoice</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('deleteLead')}>credit score</MenuItem>
        </Menu>

        {/* Invoice Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Send Invoice</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="outlined"
              value={invoiceDetails.amount}
              onChange={handleInvoiceChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={invoiceDetails.description}
              onChange={handleInvoiceChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendInvoice} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AdminPanal;
