import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { calculatorStyles, gradeRowsStyles } from './calculator.styles';
import GradeRow from './GradeRow';
import { Grade, GradeWeight } from './calculator.types';
import { initialData, serverURL } from './calculator.constants';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getLetterGrade } from './calculator.service';
import { Outlet, useNavigate } from 'react-router-dom';

const Calculator = () => {

    const navigate = useNavigate();
    const isTeacher = localStorage.getItem('isTeacher') === '1';

    const [ calculatorState, setCalculatorState ] = useState({
        classGrade: '',
        letterGrade: ''
    });

    const formik = useFormik({
        initialValues: initialData,
        validationSchema: yup.array().of(yup.object({
            points: yup.number().min(0).max(100),
            weight: yup.string()
        })),
        onSubmit: async (values: Grade[]) => {
            const results = await fetch(`${serverURL}/calculate`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(values)
            }).then(res => res.json())
                .catch((error) => console.error(error));
            setCalculatorState({
                classGrade: results.total,
                letterGrade: getLetterGrade(results.total)
            });
        }
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: GradeWeight | string, index: number) => {
        const updated = [ ...formik.values ];
        const key = event.target.name as keyof Grade;
        let newGrade = { ...updated[index], [key]: value };
        if ( key === 'points' && ( +value < 0 || +value > 100 )) {
            newGrade = { ...updated[index], points: +value < 0 ? 0 : 100 };
            updated[index] = newGrade;
            formik.setValues(updated);
            return;
        }
        if ( key === 'points' ) {
            newGrade = { ...updated[index], points: Math.trunc(+value) };
        }
        updated[index] = newGrade;
        formik.setValues(updated);
    };

    const handleAddRow = () => {
        const updated = [ ...formik.values ];
        updated.push({ points: 0, weight: 'homework' });
        formik.setValues(updated);
    };

    const handleRemoveItem = (index: number) => {
        const updated = formik.values.filter((grade, gradeIndex) => index !== gradeIndex);
        formik.setValues(updated);
    };

    const handleSettings = () => {
        navigate('/settings');
    };

    return (
        <Box textAlign='center'>
            <Box
                component='form'
                onSubmit={formik.handleSubmit}
                width='650px'
                height='550px'
                margin='auto'
                paddingTop='5rem'>
                <Paper sx={calculatorStyles}>
                    <Typography variant='h4'>Grade Calculator</Typography>
                    <Box sx={gradeRowsStyles}>
                        {formik.values.map((grade, index) => (
                            <GradeRow
                                key={`grade-row-${index}`}
                                grade={grade}
                                index={index}
                                error={formik.touched[index] && formik.errors[index]}
                                handleChange={handleChange}
                                handleRemoveItem={() => handleRemoveItem(index)} />
                        ))}
                    </Box>
                    <Box textAlign='left' padding='10px 24px' borderBottom='2px solid #ddd'>
                        <Box>
                            <Typography>Class Grade: {(+calculatorState.classGrade).toFixed(2)}</Typography>
                        </Box>
                        <Box>
                            <Typography>Letter Grade: {calculatorState.letterGrade}</Typography>
                        </Box>
                    </Box>
                    <Box margin='auto auto 0 auto' width='75%' justifyContent='space-between' padding='10px' display='flex'>
                        <Button variant='outlined' onClick={handleAddRow}>Add new grade</Button>
                        <Button variant='contained' type='submit'>Calculate</Button>
                    </Box>
                    {isTeacher && (
                        <Box paddingBottom='10px'>
                            <Button onClick={handleSettings}>Settings</Button>
                        </Box>
                    )}
                </Paper>
            </Box>
            <Outlet />
        </Box>
    );
};

export default Calculator;
