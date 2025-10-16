import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/Images/logo1.png";

export default function Navbar({ onLoginClick }) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ background: "linear-gradient(90deg, #4e342e, #212121)", padding: { xs: "0 1rem", md: "0 2.5rem" } }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    
                    <Typography  variant="h6" component="div">
                        <img src={logo} className="h-12 md:h-16" alt="Typing Trainer" />
                    </Typography>

                    <Button variant="contained" sx={{ display: { xs: "none", md: "block" },  boxShadow: "0px 0px 1px 1px rgba(255,255,255,0.5)", backgroundImage: "linear-gradient(90deg, #4e342e, #212121)", fontSize: "16px", "&:hover": { backgroundColor: "#8d8b8b" }, }} onClick={onLoginClick}>Login
                    </Button>

                </Toolbar>
            </AppBar>

        </Box>
    );
}