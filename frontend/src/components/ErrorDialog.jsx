import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ErrorDialog = ({ open, setOpenDialog, dialogMessage }) => {
  return (
    <Dialog open={open} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <p>{dialogMessage}</p> {/* Display the error message */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        
  );
};

export default ErrorDialog;
