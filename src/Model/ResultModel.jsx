import React from "react";
import { Box, Typography, Button, Divider, useMediaQuery } from "@mui/material";

export default function ResultModel({ completionData, handleClose }) {
    const isMobile = useMediaQuery('(max-width:600px)');

    if (!completionData) return null;

    const {
        timeTaken = 0,
        wordsTyped = 0,
        totalWordsInParagraph = 0,
        remainingWords = 0,
        wpm = 0,
        accuracy = 0,
    } = completionData;


    const safeTimeTaken = typeof timeTaken === 'number' ? timeTaken : 0;
    const formattedTime = safeTimeTaken.toFixed(2);
    
    return (
        <Box
            sx={{
                // position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                p: isMobile ? 2 : 0,

            }}
        >
            <Box
                sx={{

                    bgcolor: "transparent",
                    borderRadius: 2,
                    p: isMobile ? "5px" : 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: isMobile ? "auto" : "100%",
                    maxWidth: isMobile ? "100vw" : "400px",
                    maxHeight: isMobile ? "100vh" : "auto",
                    width: "100%",
                    overflow: 'hidden',
                }}
            >
                <Typography
                    variant={isMobile ? "h6" : "h1"}
                    sx={{
                        fontWeight: "bold",
                        color: "green",
                        textAlign: "center",
                        mb: 2,
                        fontSize: isMobile ? '1.25rem' : '1.5rem'
                    }}
                >
                    🎉 Last Turn!
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: isMobile ? 2 : 2 }}>
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>⏱ Time Taken:</span>
                        <span style={{ fontWeight: "600" }}>{formattedTime} sec</span>
                    </Typography>

                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>📝 Words Typed:</span>
                        <span style={{ fontWeight: "600" }}>{wordsTyped}</span>
                    </Typography>

                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>📄 Total Words:</span>
                        <span style={{ fontWeight: "600" }}>{totalWordsInParagraph}</span>
                    </Typography>

                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>✏️ Remaining Words:</span>
                        <span style={{ fontWeight: "600" }}>{remainingWords}</span>
                    </Typography>

                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>⚡ WPM:</span>
                        <span style={{ fontWeight: "600", color: "#1565C0" }}>{wpm}</span>
                    </Typography>

                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                    >
                        <span style={{ color: "#555" }}>🎯 Accuracy:</span>
                        <span style={{ fontWeight: "600", color: "#2E7D32" }}>{accuracy}%</span>
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Button
                    onClick={handleClose}
                    sx={{
                        width: isMobile ? '100%' : 'auto',
                        alignSelf: isMobile ? 'stretch' : 'center',
                        px: 10,
                        py: isMobile ? 1 : 1,
                        color: "white",
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        background: 'linear-gradient(135deg, #4e342e, #212121)'
                    }}
                >
                    Close
                </Button>
            </Box>
        </Box>
    );
}