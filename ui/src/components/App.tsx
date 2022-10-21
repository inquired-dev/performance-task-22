import { Container } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calculator from './Calculator/Calculator';
import Settings from './Calculator/Settings';
import Login from './Login/Login';

const App = () => {

    return (
        <Container sx={{ height: '100vh', background: '#f6f6f6' }}>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/calculator' element={<Calculator />}>
                    <Route path='/calculator/settings' element={<Settings />} />
                </Route>
            </Routes>
        </Container>
    );
};

export default App;
