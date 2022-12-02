import { Container } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calculator from './Calculator/Calculator';
import Settings from './Calculator/Settings';
import Login from './Login/Login';
import TopNav from './Navigation/TopNav';
import Routing from './Routing';

const App = () => {

    window.addEventListener('beforeunload', () => localStorage.removeItem('isTeacher'));

    return (
       <Routing/>
    );
};

export default App;
