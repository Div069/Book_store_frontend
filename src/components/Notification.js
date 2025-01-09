import React from "react";
import { Snackbar, Alert, Box } from "@mui/material";

const Notification = ({ notification, setNotification }) => {
  const handleClose = () => {
    setNotification(null);
  };

  return (
    <Snackbar
      open={!!notification}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "transparent", // Transparent for custom styling
          boxShadow: "none",
        },
        "& .MuiSnackbar-root": {
          animation: "slideIn 0.5s ease-out",
        },
        "@keyframes slideIn": {
          from: {
            transform: "translateX(-100%) translateY(-100%)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0) translateY(0)",
            opacity: 1,
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2196f3, #21cbf3)",
          borderRadius: "12px",
          padding: "16px",
          color: "white",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          width: "300px", // Adjust width as needed
        }}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          sx={{
            width: "100%",
            background: "transparent",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            padding: 0,
            boxShadow: "none",
          }}
          icon={
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "8px",
              }}
            >
              <span style={{ color: "#2196f3", fontWeight: "bold" }}>!</span>
            </Box>
          }
        >
          {notification}
        </Alert>
      </Box>
    </Snackbar>
  );
};

export default Notification;
