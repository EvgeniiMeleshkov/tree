import React from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';
import {AppBar, Button, Toolbar} from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>

                <AppsIcon/>
                <ReplyIcon/>

                <Button color="inherit">Просмотр</Button>
                <Button color="inherit">Управление</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;