import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleRefresh } from '../redux/slice'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as R from 'ramda';


const ItemDialog = ({ open, handleClose, data, setData }) => {
    const dispatch = useDispatch();

    const initialState = {
        id: 0,
        member_Name: "",
        is_Family_Invited: false,
        total_Members: null,
        is_Barat_Invited: false,
        is_Walima_Invited: false,
    }

    useEffect(() => {
        setData(initialState);
    }, [])

    const handleSave = () => {
        const existingData = JSON.parse(localStorage.getItem("data")) || [];

        if (data.id !== 0) {
            const updatedItems = existingData.map(item =>
                item.id === data.id ? { ...item, ...data } : item
            );
            localStorage.setItem("data", JSON.stringify(updatedItems));
            setData(initialState);
            handleClose();
            dispatch(toggleRefresh());
            console.log(updatedItems, "updatedItems")
            return
        }

        const lastItem = R.last(existingData);
        existingData.push({ ...data, id: lastItem ? lastItem.id + 1 : 1 });
        localStorage.setItem("data", JSON.stringify(existingData));
        setData(initialState);
        handleClose();
        dispatch(toggleRefresh());
    }

    const onValueChange = ({ target: input }) => {
        console.log(input.name, "name", input.value)
        const dataClone = { ...data };
        dataClone[input.name] = input.value;

        setData(dataClone);
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Member</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    name="member_Name"
                    fullWidth
                    value={data.member_Name}
                    onChange={onValueChange}
                />
                <FormControlLabel control={<Checkbox checked={data.is_Barat_Invited} onChange={(e) => setData({ ...data, is_Barat_Invited: e.target.checked })}
                />} label="Barat ?" />
                <hr />
                <FormControlLabel control={<Checkbox checked={data.is_Walima_Invited} onChange={(e) => setData({ ...data, is_Walima_Invited: e.target.checked })}
                />} label="Walima ?" />
                <hr />
                <FormControlLabel control={<Checkbox checked={data.is_Family_Invited} onChange={(e) => setData({ ...data, is_Family_Invited: e.target.checked })}
                />} label="Is Family Invited ?" />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Total Members"
                    type="number"
                    fullWidth
                    name="total_Members"
                    value={data.total_Members}
                    onChange={onValueChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ItemDialog
