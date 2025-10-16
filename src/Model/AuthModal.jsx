import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "../Components/Auth/LoginForm";
import SignUpForm from "../Components/Auth/SignUpForm";

export default function AuthModal({ open, onClose }) {
    const [tab, setTab] = useState(0);

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm"
            fullWidth
            sx={{ 
                '& .MuiDialog-paper': {
                    maxHeight: '93vh', // Maximum height viewport ka 90%
                    borderRadius: 2,
                    overflow: 'hidden' // Scroll hide karne ke liye
                }
            }}
        >
            {/* Modal Header */}
            <DialogTitle sx={{  }}>
                <IconButton 
                    aria-label="close" 
                    onClick={onClose} 
                    sx={{ 
                        position: "absolute", 
                        right: 8, 
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                {tab === 0 ? 
                    <LoginForm setTab={setTab} /> : 
                    <SignUpForm setTab={setTab} />
                }
            </DialogContent>
        </Dialog>
    );
}