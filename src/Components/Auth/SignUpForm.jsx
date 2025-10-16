import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    IconButton,
    InputAdornment,
    Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm({ setTab }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    let navigate = useNavigate();

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let newError = { name: "", email: "", password: "", confirmPassword: "" };

        if (!formData.name.trim()) {
            newError.name = "Name is required";
            isValid = false;
        }

        if (!formData.email.trim() || !formData.email.includes("@")) {
            newError.email = "Valid email is required";
            isValid = false;
        }

        if (formData.password.length < 6) {
            newError.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newError.confirmPassword = "Passwords don't match";
            isValid = false;
        }

        setError(newError);

        if (isValid) {
            alert("Signed up successfully!");
            console.log("Signup Data: ", formData);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            navigate("/login");
        }

        if (Object.keys(newError).length > 0) {
            setTimeout(() => {
                setError({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            }, 2000);
        }
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked!");
        // Google Auth integration here
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%", // Modal ki height lelo
                width: "100%",
                padding: 1,
                overflow: 'auto', // Internal scroll agar content zyada ho
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                    border: 'none',
                    boxShadow: 'none !important'
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    Create Account
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        error={Boolean(error.name)}
                        helperText={error.name}
                        sx={{ mb: 1 }}
                    />

                    {/* Email */}
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        margin="dense"
                        required
                        error={Boolean(error.email)}
                        helperText={error.email}
                        sx={{ mb: 1 }}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        margin="dense"
                        required
                        error={Boolean(error.password)}
                        helperText={error.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 1 }}
                    />

                    {/* Confirm Password */}
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        size="small"
                        required
                        error={Boolean(error.confirmPassword)}
                        helperText={error.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                        size="small"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    {/* Signup Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            height: "40px",
                            fontSize: "14px",
                            fontWeight: "bold",
                            mt: 1
                        }}
                    >
                        Sign Up
                    </Button>
                </form>

                {/* Divider */}
                <Divider sx={{ my: 2 }}>OR</Divider>

                {/* Google Signup */}
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<FcGoogle size={20} />}
                    onClick={handleGoogleSignup}
                    sx={{
                        height: "40px",
                        fontSize: "14px",
                        textTransform: "none",
                    }}
                >
                    Sign Up with Google
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <span
                        onClick={() => setTab(0)}
                        style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}>
                        <u>
                            <Link to="/login" >
                                Login
                            </Link>
                        </u>
                    </span>
                </Typography>
            </Paper>
        </Box>
    );
}