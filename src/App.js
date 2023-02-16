import { Box } from '@mui/material';
import React from 'react';
import { Header } from './components/header';
import { RoutesComponent } from './Routes';

const App = () => {
    return (
        <div>
            <Header />
            <Box sx={{ marginTop: 5 }}>{RoutesComponent()}</Box>
        </div>
    );

};

export default App
