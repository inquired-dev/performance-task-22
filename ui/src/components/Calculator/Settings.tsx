import React, { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Box, Button, Divider, IconButton, InputLabel, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Close, Percent } from '@mui/icons-material';

const Settings = () => {

    const navigate = useNavigate();
    const [ totalError, setTotalError ] = useState(false);
    const [ feedback, setFeedback ] = useState('');

    const formik = useFormik({
        initialValues: {
            homework: 0,
            assessments: 0,
            quizzes: 0,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            homework: yup.number(),
            assessments: yup.number(),
            quizzes: yup.number(),
        }),
        onSubmit: async (values: {[key: string]: number}) => {
            const validated = validateTotal();
            if ( validated ) {
                //submit
                const result = await fetch('http://localhost:8081/settings', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify(values)
                }).then(res => res.json()).catch(console.error);
                setFeedback(result);
            }
        }
    });

    useEffect(() => {
        // fetch initial weight data:
        const getSettings = async () => {
            const result = await fetch('http://localhost:8081/settings')
                .then(res => res.json()).catch(console.error);
            if ( result ) {
                formik.setValues(result);
            }
        };
        getSettings();
    }, []);

    const getTotal = () => Math.round((formik.values.homework + formik.values.assessments + formik.values.quizzes) * 100);
    const validateTotal = () => {
        const total = getTotal();
        setTotalError(total !== 100);
        return total === 100;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if ( +value < 0 || +value > 100 ) {
            return;
        }
        const converted = +value / 100;
        formik.setFieldValue(name, converted);
    };

    return (
        <Box paddingTop='5rem'>
            <Box
                component='form'
                position='relative'
                width='500px'
                margin='auto'
                onSubmit={formik.handleSubmit}
            >
                <Paper sx={{ padding: '24px' }}>
                    <Typography variant='h5' textAlign='center' gutterBottom>
                        Grade weight settings:
                    </Typography>
                    <Divider />
                    <Box width='50%' margin='auto' padding='20px'>
                        <Box
                            display='flex'
                            marginBottom='10px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <InputLabel sx={{ marginRight: '5px', fontWeight: 'bold' }}>
                                Homework:
                            </InputLabel>
                            <TextField
                                name='homework'
                                type='number'
                                value={(formik.values.homework * 100)}
                                InputProps={{ endAdornment: <Percent fontSize='small' /> }}
                                onChange={handleChange}
                                size='small'
                                sx={{ width: '100px' }}
                            />
                        </Box>
                        <Box
                            display='flex'
                            marginBottom='10px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <InputLabel sx={{ marginRight: '5px', fontWeight: 'bold' }}>
                                Assessment:
                            </InputLabel>
                            <TextField
                                name='assessments'
                                type='number'
                                value={(formik.values.assessments * 100)}
                                InputProps={{ endAdornment: <Percent fontSize='small' /> }}
                                onChange={handleChange}
                                size='small'
                                sx={{ width: '100px' }}
                            />
                        </Box>
                        <Box
                            display='flex'
                            marginBottom='10px'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <InputLabel sx={{ marginRight: '5px', fontWeight: 'bold' }}>
                                Quiz:
                            </InputLabel>
                            <TextField
                                name='quizzes'
                                type='number'
                                value={(formik.values.quizzes * 100)}
                                InputProps={{ endAdornment: <Percent fontSize='small' /> }}
                                onChange={handleChange}
                                size='small'
                                sx={{ width: '100px' }}
                            />
                        </Box>
                    </Box>
                    <Typography
                        textAlign='right'
                        marginRight='7rem'
                        marginBottom='2rem'
                        color={getTotal() === 100 ? 'inherit' : 'error'}
                    >
                        Total: {getTotal()}%
                    </Typography>
                    {totalError && (
                        <Typography
                            position='absolute'
                            textAlign='center'
                            color='error'
                            sx={{ bottom: '4rem', right: '15%' }}
                        >
                            Total weight cannot be lesser or greater than 100
                        </Typography>
                    )}
                    <Box display='flex' justifyContent='space-between'>
                        <Button onClick={() => navigate('/calculator')} variant='outlined'>Back</Button>
                        <Button variant='contained' color='primary' type='submit'>Save</Button>
                    </Box>
                </Paper>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={!!feedback}
                onClose={() => setFeedback('')}
                transitionDuration={{ appear: 500, exit: 0 }}
            >
                <Alert
                    severity='info'
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setFeedback('')}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                >
                    {feedback}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Settings;
