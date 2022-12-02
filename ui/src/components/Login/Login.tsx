import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const goToCalculator = () => navigate('/calculator');

    const handleStudentLogin = () => {
        localStorage.removeItem('isTeacher');
        goToCalculator();
    };

    const handleTeacherLogin = () => {
        localStorage.setItem('isTeacher', '1');
        goToCalculator();
    };

    return (
        <Box width='100%' textAlign='center'>
            <Typography variant='h2'>Welcome!</Typography>
            <Typography variant='h4'>Are you a</Typography>
            <Box width='50%' margin='auto' display='flex' justifyContent='space-between'>
                <Button variant='contained' color='primary' onClick={handleStudentLogin}>Student</Button>
                <Button variant='contained' color='secondary' onClick={handleTeacherLogin}>Teacher</Button>
            </Box>
        </Box>
    );
};

export default Login;
