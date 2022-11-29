import React from 'react';
import { Box, FormControlLabel, IconButton, InputLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Grade } from './calculator.types';
import { Close } from '@mui/icons-material';
import { FormikErrors } from 'formik';

interface GradeRowProps {
    grade: Grade
    index: number
    error: FormikErrors<Grade> | undefined
    handleChange: (event: React.ChangeEvent, value: any, index: number) => void
    handleRemoveItem: () => void
}

const StyledRadio = <Radio disableRipple size='small' sx={{ backgroundColor: 'unset !important' }} />;

const GradeRow = ({ grade, index, error, handleChange, handleRemoveItem }: GradeRowProps) => (
    <Box display='flex' alignItems='center' margin='5px' padding='0px 10px'>
        <Typography width='24px' marginRight='5px'>{index + 1}.</Typography>
        <InputLabel sx={{ marginRight: '5px' }}>Grade:</InputLabel>
        <TextField
            name='points'
            onChange={event => handleChange(event, event.target.value.toString(), index)}
            size='small'
            type='number'
            value={grade.points.toString()}
            error={!!error && !!error.points}
            helperText={!!error && !!error.points && 'Invalid grade'}
            sx={{ width: '80px', marginRight: '24px' }} />
        <RadioGroup name='weight' row value={grade.weight} onChange={(event, value) => handleChange(event, value, index)}>
            <FormControlLabel value='homework' control={StyledRadio} label="Homework" />
            <FormControlLabel value='assessment' control={StyledRadio} label="Test" />
            <FormControlLabel value='quiz' control={StyledRadio} label="Quiz" /> 
            {/* ^^^^^^^^^^^^^^^this needed to be updated to value='quiz' so we can toggle the radio buttons properly and get accurate data  */}
        </RadioGroup>
        {index > 0 && (
            <IconButton color='error' size='small' onClick={handleRemoveItem} sx={{ marginLeft: 'auto' }}>
                <Close />
            </IconButton>
        )}
    </Box>
);

export default GradeRow;
