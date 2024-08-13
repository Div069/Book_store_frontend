import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cover from "./abstract-blur-beautiful-luxury-shopping-mall-center.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the fade-in effect when the component mounts
    setFadeIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://book-store-backend-2gzw.onrender.com/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
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
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="xs">
        <Fade in={fadeIn} timeout={1000}>
          <Paper
            elevation={6}
            sx={{
              p: 4,
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Optional: Blur the background image behind the form
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography variant="h4" color="primary" fontWeight="bold" style={{ textAlign: "center" }} gutterBottom>
              Welcome to Book 
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold" style={{ textAlign: "center" }}>
  Haven
</Typography>
            <Typography variant="h6" gutterBottom>
              Login to Continue
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
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error)}
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
                      backgroundColor: "#303f9f",
                      transform: "scale(1.02)",
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
                transition: "border-color 0.3s, transform 0.3s",
                "&:hover": {
                  borderColor: "#f50057",
                  transform: "scale(1.02)",
                },
              }}
            >
              Don't have an account? Sign Up
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;
