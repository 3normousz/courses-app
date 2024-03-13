import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { register } from '../api/CourseAPI';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SignupForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordNotMatched, setIsPasswordNotMatched] = useState(false);
    const navigate = useNavigate();

    const defaultTheme = createTheme();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password != passwordConfirmation) {
            setIsPasswordNotMatched(true);
        } else {
            setIsPasswordNotMatched(false);
            const response = await register(username, password);
            onRegister();
            navigate("/my-courses");
        }
    };

    const handleSignInClick = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Create Account
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required={true}
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="email"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={isPasswordNotMatched}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            name="password-confirmation"
                            label="Password Confirmation"
                            type="password"
                            id="password-confirmation"
                            error={isPasswordNotMatched}
                            helperText={isPasswordNotMatched ? "Password not matched" : null}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={handleSignInClick} variant="body2">
                                    {"Don't have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignupForm;
