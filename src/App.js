import React from 'react';
import { Header } from './components/header';
import { RoutesComponent } from './Routes';

const App = () => {
    return (
        <div>
            <Header />
            {RoutesComponent()}
        </div>
    );

};

export default App
