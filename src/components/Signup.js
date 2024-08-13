import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cover from "./abstract-blur-beautiful-luxury-shopping-mall-center.jpg"; // Importing the background image
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("https://book-store-backend-2gzw.onrender.com/auth/signup", {
        name,
        email,
        password,
      });
      navigate("/login"); // Redirect to login after successful signup
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensure the background covers the whole viewport
        backgroundImage: `url(${cover})`, // Set the background image
        backgroundSize: "cover", // Make sure the image covers the entire area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the background from repeating
        display: "flex", // Use flexbox to center the form
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly more opaque background
            backdropFilter: "blur(8px)", // Reduced blur effect
            borderRadius: 3, // Slightly more rounded corners
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Lighter shadow
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            Join Book Haven
          </Typography>
          <Typography variant="h6" gutterBottom>
            Create Your Account
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(error)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error)}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3f51b5",
                },
              }}
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  mb: 2,
                  transition: "background-color 0.3s, transform 0.3s",
                  "&:hover": {
                    backgroundColor: "#3f51b5", // Hover color
                    transform: "scale(1.02)",
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign Up"}
              </Button>
            </Box>
          </form>
          <Button
            onClick={() => navigate("/login")}
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              transition: "border-color 0.3s, transform 0.3s",
              "&:hover": {
                borderColor: "#f50057",
                transform: "scale(1.02)",
              },
            }}
          >
            Already have an account? Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
