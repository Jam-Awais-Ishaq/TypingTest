import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
} from "@mui/material";
import { Delete, Visibility, TrendingUp } from "@mui/icons-material";
import TestDetail from "../../Model/TestDetail";

export const addNewRecord = (completionData) => {
    if (!completionData) return;

    const savedRecords = localStorage.getItem("typingTestRecords") || "[]";
    const records = JSON.parse(savedRecords);

    const newRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        timeTaken: completionData.timeTaken,
        wordsTyped: completionData.wordsTyped,
        totalWords: completionData.totalWordsInParagraph,
        remainingWords: completionData.remainingWords,
        wpm: completionData.wpm,
        accuracy: completionData.accuracy,
        isTimeUp: completionData.isTimeUp || false,
    };

    const updatedRecords = [newRecord, ...records].slice(0, 50);
    localStorage.setItem("typingTestRecords", JSON.stringify(updatedRecords));
    return updatedRecords;
};

export default function PreviousRecords() {
    const isMobile = useMediaQuery("(max-width:600px)");
    const isTablet = useMediaQuery("(max-width:900px)");

    const [state, setState] = useState({
        records: [],
        selectedRecord: null,
        deleteDialog: false,
        viewDialog: false,
    });

    const { records, selectedRecord, deleteDialog, viewDialog } = state;

    useEffect(() => {
        const savedRecords = localStorage.getItem("typingTestRecords");
        if (savedRecords) {
            setState(prev => ({ ...prev, records: JSON.parse(savedRecords) }));
        }
    }, []);

    const handleViewRecord = (record) => {
        setState(prev => ({ ...prev, selectedRecord: record, viewDialog: true }));
    };

    const handleDeleteRecord = (record) => {
        setState(prev => ({
            ...prev,
            selectedRecord: record,
            deleteDialog: true
        }));
    };

    const handleConfirmDelete = () => {
        const updatedRecords = records.filter(r => r.id !== selectedRecord.id);
        setState(prev => ({
            ...prev,
            records: updatedRecords,
            deleteDialog: false,
            selectedRecord: null,
        }));
        localStorage.setItem("typingTestRecords", JSON.stringify(updatedRecords));
    };

    const handleClearAll = () => {
        setState(prev => ({ ...prev, records: [] }));
        localStorage.setItem("typingTestRecords", "[]");
    };

    const handleCloseDialog = () => {
        setState(prev => ({
            ...prev,
            deleteDialog: false,
            viewDialog: false,
            selectedRecord: null,
        }));
    };

    const getPerformanceRating = (wpm, accuracy) => {
        if (wpm >= 40 && accuracy >= 95) return { label: "Excellent", color: "success" };
        if (wpm >= 30 && accuracy >= 90) return { label: "Good", color: "primary" };
        if (wpm >= 20 && accuracy >= 85) return { label: "Average", color: "warning" };
        return { label: "Beginner", color: "error" };
    };

    const formatDate = (dateString) => {
        if (isMobile) {
            const date = new Date(dateString);
            return `${date.getDate()}/${date.getMonth() + 1}`;
        }
        return dateString;
    };

    return (
        <Box sx={{
            p: isMobile ? 1 : 3,
            minHeight: '80vh',
            backgroundColor: 'background.default'
        }}>
           
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                mb: 3,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 2 : 0
            }}>
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                        textAlign: isMobile ? "center" : "left",
                        width: isMobile ? "100%" : "auto"
                    }}
                >
                    <TrendingUp sx={{
                        mr: 1,
                        verticalAlign: "middle",
                        fontSize: isMobile ? "1.5rem" : "2rem"
                    }} />
                    Previous Records
                </Typography>

                <div className="md:w-fit w-full text-center">
                    {records.length > 0 && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleClearAll}
                            size={isMobile ? "small" : "medium"}
                            sx={{
                                width: isMobile ? "80%" : "auto",
                                mt: isMobile ? 1 : 0
                            }}
                        >
                            Clear All Records
                        </Button>
                    )}
                </div>
            </Box>

            {records.length > 0 ? (
                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: isMobile ? 400 : 300,
                        overflowY: "auto",
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <Table
                        stickyHeader
                        size={isMobile ? "small" : "medium"}
                        sx={{
                            '& .MuiTableCell-root': {
                                py: isMobile ? 1 : 1.5,
                                px: isMobile ? 1 : 2,
                            }
                        }}
                    >
                        <TableHead>
                            <TableRow
                                sx={{
                                    "& > *": {
                                        background: "linear-gradient(135deg, #1976d2, #1565c0)",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: isMobile ? '0.75rem' : '0.875rem',
                                        py: isMobile ? 1 : 2
                                    },
                                }}
                            >
                                <TableCell sx={{ width: isMobile ? '20%' : '30%', fontSize: isMobile ? "8px" : "15px" }}>Date</TableCell>
                                <TableCell sx={{ width: isMobile ? '10%' : '15%', fontSize: isMobile ? "8px" : "15px" }}>WPM</TableCell>
                                <TableCell sx={{ width: isMobile ? '10%' : '20%', fontSize: isMobile ? "8px" : "15px" }}>Accuracy</TableCell>
                                <TableCell sx={{ width: isMobile ? '20%' : '20%', fontSize: isMobile ? "8px" : "15px" }}>Status</TableCell>
                                <TableCell sx={{ width: isMobile ? '10%' : '15%', fontSize: isMobile ? "8px" : "15px" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {records.map((record) => {
                                const performance = getPerformanceRating(record.wpm, record.accuracy);
                                return (
                                    <TableRow
                                        key={record.id}
                                        hover
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: isMobile ? '0.7rem' : '0.875rem',
                                                    fontWeight: isMobile ? 500 : 400
                                                }}
                                            >
                                                {formatDate(record.date)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                fontWeight="bold"
                                                color="primary"
                                                sx={{
                                                    fontSize: isMobile ? '0.8rem' : '1rem'
                                                }}
                                            >
                                                {record.wpm}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                color="success.main"
                                                fontWeight="bold"
                                                sx={{
                                                    fontSize: isMobile ? '0.8rem' : '1rem'
                                                }}
                                            >
                                                {record.accuracy}%
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: isMobile ? 'column' : 'row',
                                                gap: 0.5,
                                                alignItems: isMobile ? 'flex-start' : 'center'
                                            }}>
                                                <Chip
                                                    label={performance.label}
                                                    color={performance.color}
                                                    size="small"
                                                    sx={{
                                                        fontSize: isMobile ? '0.6rem' : '0.7rem',
                                                        height: isMobile ? 20 : 24
                                                    }}
                                                />
                                                {record.isTimeUp && (
                                                    <Chip
                                                        label="Time Up"
                                                        color="warning"
                                                        size="small"
                                                        sx={{
                                                            fontSize: isMobile ? '0.6rem' : '0.7rem',
                                                            height: isMobile ? 20 : 24
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'flex',
                                                gap: isMobile ? 0.5 : 1
                                            }}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleViewRecord(record)}
                                                    size={isMobile ? "small" : "medium"}
                                                    sx={{
                                                        p: isMobile ? 0.5 : 1
                                                    }}
                                                >
                                                    <Visibility fontSize={isMobile ? "small" : "medium"} />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteRecord(record)}
                                                    size={isMobile ? "small" : "medium"}
                                                    sx={{
                                                        p: isMobile ? 0.5 : 1
                                                    }}
                                                >
                                                    <Delete fontSize={isMobile ? "small" : "medium"} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Paper
                    sx={{
                        p: isMobile ? 3 : 4,
                        textAlign: "center",
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <TrendingUp sx={{
                        fontSize: isMobile ? 40 : 60,
                        color: "grey.400",
                        mb: 2
                    }} />
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        color="grey.600"
                        gutterBottom
                    >
                        No Records Yet
                    </Typography>
                    <Typography
                        variant="body2"
                        color="grey.500"
                        sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
                    >
                        Complete typing tests to see your performance history here.
                    </Typography>
                </Paper>
            )}

            <TestDetail
                open={state.viewDialog}
                selectedRecord={state.selectedRecord}
                handleCloseDialog={handleCloseDialog}
            />

            <Dialog
                open={deleteDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth={isMobile ? "xs" : "sm"}
            >
                <DialogTitle sx={{
                    fontSize: isMobile ? '1.1rem' : '1.25rem',
                    p: isMobile ? 2 : 3
                }}>
                    Confirm Delete
                </DialogTitle>
                <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                        Are you sure you want to delete this record?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: isMobile ? 2 : 3 }}>
                    <Button
                        onClick={handleCloseDialog}
                        size={isMobile ? "small" : "medium"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        variant="contained"
                        size={isMobile ? "small" : "medium"}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}