import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ErrorDialog = ({ open, handleClose, errorMessage }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <p>{errorMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
