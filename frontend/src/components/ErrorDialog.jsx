import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ErrorDialog = ({ openDialog, handleClose, errorMessage }) => {
  return (
    <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>{errorMessage}</p> {/* Display the error message */}
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
