import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  CalendarMonth,
  Speed,
  CheckCircle,
  Article,
  AccessTime,
  Flag,
} from "@mui/icons-material";

export default function TestDetail({ open, selectedRecord, handleCloseDialog }) {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Icon mapping for each detail
  const iconMap = {
    Date: <CalendarMonth sx={{ color: "#1976d2" }} />,
    WPM: <Speed sx={{ color: "#2e7d32" }} />,
    Accuracy: <CheckCircle sx={{ color: "#0288d1" }} />,
    "Words Typed": <Article sx={{ color: "#6a1b9a" }} />,
    "Time Taken": <AccessTime sx={{ color: "#ef6c00" }} />,
    Status: <Flag sx={{ color: "#c62828" }} />,
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      fullScreen={isMobile}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          p: isMobile ? 1 : 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "primary.main",
          fontSize: isMobile ? "1.1rem" : "1.4rem",
        }}
      >
        🧠 Test Details
      </DialogTitle>

      <DialogContent>
        {selectedRecord ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 1.5 : 2,
              mt: 1,
              width: "100%",
            }}
          >
            {Object.entries({
              "Date": selectedRecord.date,
              "WPM": selectedRecord.wpm,
              "Accuracy": `${selectedRecord.accuracy}%`,
              "Words Typed": `${selectedRecord.wordsTyped}/${selectedRecord.totalWords}`,
              "Time Taken": `${selectedRecord.timeTaken.toFixed(2)} seconds`,
              "Status": selectedRecord.isTimeUp ? "Time Up" : "Completed",
            }).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  pb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {iconMap[key]}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: isMobile ? "0.85rem" : "0.95rem" }}
                  >
                    {key}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    color:
                      key === "Accuracy"
                        ? "#2e7d32"
                        : key === "Status"
                        ? selectedRecord.isTimeUp
                          ? "#ef6c00"
                          : "#1565c0"
                        : "text.primary",
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography color="text.secondary">No record selected.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: isMobile ? 2 : 2 }}>
        <Button
          onClick={handleCloseDialog}
          variant="contained"
          sx={{
            width: isMobile ? "90%" : "70%",
            background: "linear-gradient(90deg, #4e342e, #212121)",
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
