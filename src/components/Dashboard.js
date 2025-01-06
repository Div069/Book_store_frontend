import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Alert,
} from "@mui/material";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://book-store-backend-2gzw.onrender.com/dashboard/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStats(response.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard data. Please try again later.");
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  if (!stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "50vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Library Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Total Books */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Books
                </Typography>
                <Typography variant="h3" color="primary">
                  {stats.totalBooks}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Borrowed Books */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Borrowed Books
                </Typography>
                <Typography variant="h3" color="secondary">
                  {stats.borrowedBooks}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Available Books */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Available Books
                </Typography>
                <Typography variant="h3" sx={{ color: "green" }}>
                  {stats.availableBooks}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Users
                </Typography>
                <Typography variant="h3" sx={{ color: "purple" }}>
                  {stats.totalUsers}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
