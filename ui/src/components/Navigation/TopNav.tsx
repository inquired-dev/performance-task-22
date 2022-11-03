import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoStyles } from './nav.styles';

const TopNav = () => {

    const navigate = useNavigate();

    return (
        <AppBar color='default' position='fixed'>
            <Toolbar>
                <Typography
                    onClick={() => navigate('/')}
                    sx={logoStyles}>
                    inquirED
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopNav;
