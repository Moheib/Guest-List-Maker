import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ActionDialog({ open, onClose, onEdit, onDelete }) {

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Action Options</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose an option:
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={onEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ActionDialog
