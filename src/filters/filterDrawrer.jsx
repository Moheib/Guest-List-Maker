import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';

export default function FilterDrawer({ onFilterChange }) {

    const [drawrerState, setDrawrerState] = React.useState({
        right: false,
    });

    const [state, setState] = React.useState({
        family: false,
        barat: false,
        walima: false,
    });

    React.useEffect(() => {
        onFilterChange(state)
    }, [state])

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };
    const { family, barat, walima } = state;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawrerState({ ...drawrerState, [anchor]: open });
    };

    const list = (anchor) => {

        return (
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onKeyDown={toggleDrawer(anchor, false)}
            >
                <FormControl component="fieldset">
                    <FormLabel component="legend">Filters</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={family} name='family' onChange={handleChange} />}
                            label="Family" />
                        <FormControlLabel
                            control={<Checkbox checked={barat} name='barat' onChange={handleChange} />}
                            label="Barat" />
                        <FormControlLabel
                            control={<Checkbox checked={walima} name='walima' onChange={handleChange} />}
                            label="Walima" />
                    </FormGroup>
                </FormControl>
            </Box>
        );
    };

    const CustomDrawer = styled.div`
    position: absolute; 
    top: 100px;
    right: 0;
    height: 500px;
    padding: 1rem 0 0 1rem;
    width: 20%;
    background: linear-gradient(to right, #fbfbfb, #ededed);
    border: 2px solid #ededed;
    box-shadow: 
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05),
        0 2px 4px -1px rgba(0, 0, 0, 0.02),
        0 1px 3px 0 rgba(0, 0, 0, 0.01);
`;

    return (
        <div >
            <CustomDrawer>
                {list('right')}
            </CustomDrawer>
        </div>
    );
}
