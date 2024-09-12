import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import cover from "./abstract-blur-beautiful-luxury-shopping-mall-center.jpg"; // Importing the background image
import axios from "axios";

const Login = () => {
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
      const response = await axios.post("https://book-store-backend-2gzw.onrender.com/auth/login", {
        email,
        password,
      });

      // Store the token, userId, and email in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("email", email);

      navigate("/home"); // Redirect to home page after login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(135deg, rgba(63, 81, 181, 0.8), rgba(255, 255, 255, 0.4)), url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h4" sx={{ fontFamily: 'Poppins', fontWeight: 600 }} color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h6" gutterBottom>
            Login to your account
          </Typography>
          {error && (
            <Typography variant="body2" color="error" gutterBottom sx={{ animation: "shake 0.3s" }}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit} noValidate>
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
                  boxShadow: "0 0 8px rgba(63, 81, 181, 0.6)",
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
                  boxShadow: "0 0 8px rgba(63, 81, 181, 0.6)",
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
                  backgroundColor: "#3f51b5",
                  "&:hover": {
                    backgroundColor: "#303f9f",
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
              </Button>
            </Box>
          </form>
          <Button
            onClick={() => navigate("/signup")}
            fullWidth
            variant="outlined"
            color="secondary"
            sx={{
              mt: 2,
              mb: 2,
              transition: "transform 0.3s, border-color 0.3s",
              "&:hover": {
                borderColor: "#f50057",
                transform: "scale(1.05)",
              },
            }}
          >
            Don't have an account? Sign Up
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
