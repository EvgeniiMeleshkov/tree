import React from 'react';
import {Divider, MenuItem, MenuList, Paper} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewQuiltSharpIcon from '@mui/icons-material/ViewQuiltSharp';

const Sidebar = () => {
    return (
        <Paper>
            <MenuList>
                <MenuItem>
                    <span>
                        <p>Название проекта</p>
                        <p> Аббревиатура</p>
                    </span>
                    <KeyboardArrowDownIcon/>
                </MenuItem>
                <Divider/>
                <MenuItem><ViewQuiltSharpIcon/>Profile</MenuItem>
                <MenuItem><ViewQuiltSharpIcon/>My account</MenuItem>
                <MenuItem><ViewQuiltSharpIcon/>Logout</MenuItem>
            </MenuList>
        </Paper>
    );
};

export default Sidebar;