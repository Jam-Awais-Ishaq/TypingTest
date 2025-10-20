import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    Drawer,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SpeedIcon from "@mui/icons-material/Speed";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function SideBar({ onLoginClick, onRefresh }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => () => {
        setOpen(state);
    };

    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { text: "Leaderboard", icon: <EmojiEventsIcon />, path: "/leaderboard" },
        { text: "Test Speed", icon: <SpeedIcon />, path: "/test" },
        { text: "Previous Records", icon: <HistoryIcon />, path: "/records" },
        { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
        { text: "Refresh Page", icon: <RefreshIcon />, path: "" },
    ];

    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "absolute",
                    top: 5,
                    right: 15,
                    color: "white",
                    zIndex: 1400,
                }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: "100%",
                        background: "linear-gradient(230deg, #4e342e, #212121)",
                        height: { xs: "112vh" },
                        color: "white",
                        padding: "8px 10px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontFamily: "serif",
                            fontWeight: "bold",
                            textAlign: "center",
                            mb: 3,
                        }}
                    >
                        Typing Tester
                    </Typography>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                component={item.text === "Refresh Page" ? "button" : Link}
                                to={item.text === "Refresh Page" ? undefined : item.path}
                                onClick={item.text === "Refresh Page" ? onRefresh : undefined}
                                sx={{
                                    mb: 2,
                                    borderRadius: "12px",
                                    padding: "12px 16px",
                                    transition: "all 0.3s ease",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.15)",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "16px",
                                        fontFamily: "serif",
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        fullWidth
                        sx={{
                            mt: "-24px",
                            backgroundImage: "linear-gradient(90deg, #4e342e, #212121)",
                            fontSize: "16px",
                            color: "white",
                            "&:hover": {
                                backgroundImage: "linear-gradient(230deg, #4e342e, #212121)",
                            },
                            display: { xs: "block", md: "none" }, // Only show on mobile
                        }}
                        onClick={onLoginClick}
                    >
                        Login
                    </Button>
                </Box>
            </Drawer>

            <Box
                sx={{
                    width: collapsed ? "90px" : "250px", // collapsed width
                    background: "linear-gradient(230deg, #4e342e, #212121)",
                    padding: "20px 10px",
                    height: "88vh",
                    boxSizing: "border-box",
                    boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
                    color: "white",
                    display: { xs: "none", md: "block" },
                    position: "relative",
                    transition: "width 0.3s ease",
                    overflow: "hidden",
                }}
            >
                <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    sx={{
                        position: "absolute",
                        top: 1,
                        right: 5,
                        color: "white",
                    }}
                >
                    {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>

                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "serif",
                        fontWeight: "bold",
                        textAlign: "center",
                        mt: 2,
                        display: collapsed ? "none" : "block",
                    }}
                >
                    Typing Tester
                </Typography>

                <Box>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                component={item.text === "Refresh Page" ? "button" : Link}
                                to={item.text === "Refresh Page" ? undefined : item.path}
                                onClick={item.text === "Refresh Page" ? onRefresh : undefined}
                                sx={{
                                    mb: 2,
                                    borderRadius: "12px",
                                    padding: "12px 16px",
                                    transition: "all 0.3s ease",
                                    color: "white",
                                    "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: "18px",
                                        fontFamily: "serif",
                                        fontWeight: 500,
                                        display: collapsed ? "none" : "block",
                                    }}
                                />

                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </>
    );
}