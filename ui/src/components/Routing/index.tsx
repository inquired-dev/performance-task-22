import { Container } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopNav from '../Navigation/TopNav';
import Settings from '../Calculator/Settings';
import Calculator from '../Calculator/Calculator';
import Login from '../Login/Login';

function Routing(){
    return  (
    <Container sx={{ height: '100vh', background: '#f6f6f6', paddingTop: '5rem' }}>
    <TopNav />
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/calculator' element={<Calculator />} />
        <Route path='/settings' element={<Settings />} />
    </Routes>
</Container>
)}
export default Routing