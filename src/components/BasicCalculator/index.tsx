import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Paper } from '@mui/material';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('');

    const handleButtonClick = (value: string) => {
        if (value === 'C') {
            setDisplay('');
        } else if (value === '=') {
            try {
                let expression = display
                    .replace(/(\d+)\^(\d+)/g, (_match, p1, p2) => `Math.pow(${p1}, ${p2})`) // Exponentiation
                    .replace(/e\^(\d+)/g, (_match, p1) => `Math.exp(${p1})`); // Exponential
                
                let result = eval(expression).toString();
                // Limit display to a maximum of 10 digits
                if (result.length > 10) {
                    result = parseFloat(result).toFixed(8); // Round to 8 decimal places
                }
                setDisplay(result);
            } catch {
                setDisplay('Error');
            }
        } else if (value === '←') {
            setDisplay(display.slice(0, -1));
        } else if (value === '√') {
            try {
                let result = Math.sqrt(eval(display)).toString();
                if (result.length > 10) {
                    result = parseFloat(result).toFixed(8);
                }
                setDisplay(result);
            } catch {
                setDisplay('Error');
            }
        } else if (value === 'e^x') {
            try {
                let expression = display
                    .replace(/e\^(\d+)/g, (_match, p1) => `Math.exp(${p1})`); // Exponential
                
                let result = eval(expression).toString();
                if (result.length > 10) {
                    result = parseFloat(result).toFixed(8);
                }
                setDisplay(result);
            } catch {
                setDisplay('Error');
            }
        } else {
            // Limit input length to 15 characters
            if (display.length < 15) {
                setDisplay(display + value);
            }
        }
    };

    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        '√', 'e^x', '←', 'C'
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 320,
                margin: 'auto',
                padding: 2,
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    height: '100px',
                    padding: 2,
                    backgroundColor: '#fafafa',
                    borderRadius: 1,
                    textAlign: 'right',
                    fontSize: '2rem',
                    boxSizing: 'border-box',
                    marginBottom: 2,
                    overflow: 'hidden',
                }}
                elevation={1}
            >
                <Typography
                    sx={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {display}
                </Typography>
            </Paper>
            <Grid container spacing={1}>
                {buttons.map((button) => (
                    <Grid item xs={3} key={button}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '100%',
                                fontSize: '1.0rem',
                                padding: 2,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            onClick={() => handleButtonClick(button)}
                        >
                            {button}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Calculator;
