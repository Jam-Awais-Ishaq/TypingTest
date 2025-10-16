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

// import { Dialog, DialogContent, DialogTitle, Tabs, Tab, Box, IconButton,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function LoginForm({ setTab }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data: ", formData);

        if (!formData.email || !formData.password) {
            alert("Please fill in all fields.");
            setFormData({ ...formData, password: "" });
            return;
        }
        else {
            alert("Login successful!");
            setTimeout(() => {
                setFormData({ email: "", password: "" });
            }, 2000);
        }
        // yahan API call karna hoga
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked!");
        // yahan Google Auth API integrate karna hoga (Firebase/Auth0 ya backend se)
    };

    return (
        <Box sx={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", }}>
            <Paper elevation={0} sx={{ p: 4, maxWidth: 400, width: "100%", borderRadius: 1, }}>
                <Typography variant="h5" align="center" fontWeight="bold">
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Email / CNIC */}
                    <TextField className="" label="Email / CNIC" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />

                    {/* Password */}
                    <TextField label="Password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} fullWidth margin="normal" required InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>),
                    }} />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, py: 1, fontSize: "16px", backgroundColor: "#ada9a9", "&:hover": { backgroundColor: "#8d8b8b" }, }}>
                        Login
                    </Button>

                    <Divider sx={{ my: 2 }}>OR</Divider>
                    <Button variant="outlined" fullWidth startIcon={<FcGoogle size={22} />} onClick={handleGoogleLogin} sx={{ mt: 1, py: 1, fontSize: "16px", textTransform: "none", }}>
                        Login with Google
                    </Button>

                    <p className="text-center mt-1">Don't have an account : <span onClick={() => setTab(1)} className="text-blue-500"><u> SignUp </u></span></p>
                </form>
            </Paper>
        </Box>
    );
}