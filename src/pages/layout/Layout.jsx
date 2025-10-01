import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Outlet } from "react-router";
import { Navbar } from '../components/Navbar';

export const Layout = () => {

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />

            <Container maxWidth="xl" >
                <Box sx={{ pt: 4 }}>
                    <Outlet />
                </Box>
            </Container>
        </React.Fragment>
    );
}