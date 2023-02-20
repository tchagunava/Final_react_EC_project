import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './components/header';
import { fetchHomePageProducts } from './redux';
import { RoutesComponent } from './Routes';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHomePageProducts());
    });
    return (
        <div>
            <Header />
            <Box sx={{ marginTop: 10 }}>{RoutesComponent()}</Box>
        </div>
    );

};

export default App
