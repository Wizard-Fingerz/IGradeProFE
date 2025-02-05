import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Paper } from '@mui/material';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

const ScientificCalculator: React.FC = () => {
    const [display, setDisplay] = useState<string>('');
    const [result, setResult] = useState<string>('0');
    const MAX_DISPLAY_LENGTH = 150; // Set the maximum length for display

    const truncateDisplay = (text: string) => {
        return text.length > MAX_DISPLAY_LENGTH ? text.slice(-MAX_DISPLAY_LENGTH) : text;
    };

    const calculateFontSize = (text: string) => {
        if (text.length < 10) return '3rem';
        if (text.length < 20) return '2.5rem';
        if (text.length < 30) return '2rem';
        if (text.length < 40) return '1.5rem';
        if (text.length < 50) return '1.0rem';
        return '1rem';
    };

    // const formatToScientific = (value: string): string => {
    //     const num = parseFloat(value);
    //     return isNaN(num) ? value : num.toExponential(4); // Change 4 to desired significant digits
    // };


    // Handle button click events
    const handleButtonClick = (value: string) => {
        if (value === 'C') {
            setDisplay('');  // Clear display
            setResult('0');  // Reset result
        } else if (value === '=') {
            try {
                // Evaluate the current expression
                const evaluatedResult = nerdamer(display).evaluate().text();
                setResult(evaluatedResult);
                setDisplay(evaluatedResult);  // Show result as the new expression
            } catch (error) {
                console.error(error);
                setResult('Error');  // Display error message if evaluation fails
            }
        } else if (value === '←') {
            // Remove last character (backspace)
            setDisplay(display.slice(0, -1));
        } else if (value === 'cos') {
            try {
                // Convert to radians before evaluating cosine
                const radians = nerdamer(`${display} * pi / 180`).evaluate().text();
                const cosine = nerdamer(`cos(${radians})`).evaluate().text();
                setResult(cosine);
                setDisplay(cosine);
            } catch (error) {
                console.error(error);
                setResult('Error');
            }
        } else if (value === 'sin') {
            try {
                const radians = nerdamer(`${display} * pi / 180`).evaluate().text();
                const sine = nerdamer(`sin(${radians})`).evaluate().text();
                setResult(sine);
                setDisplay(sine);
            } catch (error) {
                console.error(error);
                setResult('Error');
            }
        } else if (value === 'tan') {
            try {
                const radians = nerdamer(`${display} * pi / 180`).evaluate().text();
                const tangent = nerdamer(`tan(${radians})`).evaluate().text();
                setResult(tangent);
                setDisplay(tangent);
            } catch (error) {
                console.error(error);
                setResult('Error');
            }
        } else if (value === 'log') {
            try {
                // Evaluate natural log (ln) using nerdamer
                const logarithm = nerdamer(`log(${display})`).evaluate().text();
                setResult(logarithm);
                setDisplay(logarithm);
            } catch (error) {
                console.error(error);
                setResult('Error');
            }
        } else {
            // For numbers and arithmetic operators, simply append to the display
            setDisplay(display + value);
        }
    };


    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'log', 'sin', 'cos', 'tan',
        'exp', 'sqrt', 'abs', 'ceil',
        'floor', 'round', 'diff', 'integral', '←', 'C'
    ];

    const physicsConstants = {
        c: 299792458,
        G: 6.67430e-11,
        h: 6.62607015e-34,
        k: 1.380649e-23,
        e: 1.602176634e-19,
    };

    const handleConstantClick = (constant: keyof typeof physicsConstants) => {
        setDisplay(truncateDisplay(display + physicsConstants[constant]));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                    boxSizing: 'border-box',
                    marginBottom: 2,
                    overflow: 'hidden',
                }}
                elevation={1}
            >
                <Typography
                    sx={{
                        fontSize: calculateFontSize(display || result),
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        display: 'block',
                    }}
                >
                    {display || result}
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
            <Grid container spacing={1} sx={{ marginTop: 2 }}>
                {Object.keys(physicsConstants).map((constant) => (
                    <Grid item xs={4} key={constant}>
                        <Button
                            variant="outlined"
                            sx={{
                                width: '100%',
                                padding: 1,
                                borderRadius: 1,
                            }}
                            onClick={() => handleConstantClick(constant as keyof typeof physicsConstants)}
                        >
                            {constant} = {physicsConstants[constant as keyof typeof physicsConstants]}
                        </Button>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
};

export default ScientificCalculator;
