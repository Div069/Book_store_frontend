import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      await axios.post("http://localhost:5000/auth/signup", {
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
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Paper elevation={6} sx={{ p: 4 }}>
          <Typography variant="h4" color="primary" gutterBottom>
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
      </Box>
    </Container>
  );
};

export default Signup;
